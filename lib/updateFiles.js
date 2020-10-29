const path = require("path");
const mergeFiles = require("merge-files");
const fs = require("fs");
const copyFileSync = require("fs-copy-file-sync");
const chalk = require("chalk");
const replace = require("replace-in-file");

const DONE = chalk.reset.inverse.bold.green(" DONE ");
const templatesPath = path.join(__dirname, "../templates");

/**
 * Update various build files with detox configuration
 * 
 * @param {Object} config react native config from `react-native config`
 */
module.exports = async function updateFiles(config) {
  console.log(chalk.yellow("Updating files!"));

  const PATHS = {
    "build.gradle": config.buildGradlePath,
    "AndroidManifest.xml": config.manifestPath,
    "app/build.gradle": path.join(config.sourceDir, "app/build.gradle"),
    ".detoxrc.json": path.join(config.folder, ".detoxrc.json"),
  };

  const testFileDestination = path.join(
    config.sourceDir,
    `app/src/androidTest/java/${config.packageFolder}`
  );

  const detoxTestJavaPath = path.join(testFileDestination, "DetoxTest.java");

  // update all files
  const promises = Object.keys(PATHS).map((p) => {
    let targetPath = PATHS[p];
    let sourcePath = path.join(templatesPath, p);
    return mergeFiles([sourcePath, targetPath], targetPath);
  });
  await Promise.all(promises);

  // create directory for security configuration
  let dest = path.join(config.sourceDir, "app/src/main/res/xml");
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
    copyFileSync(
      path.join(templatesPath, "network_security_config.xml"),
      path.join(dest, "network_security_config.xml")
    );
  }

  // copy DetoxTest.java
  if (!fs.existsSync(testFileDestination)) {
    fs.mkdirSync(testFileDestination, { recursive: true });
    copyFileSync(path.join(templatesPath, "DetoxTest.java"), detoxTestJavaPath);
  }

  // update AndroidManifest.xml, DetoxTest.java, app/build.gradle and settings.gradle app name
  replace.sync({
    files: [
      config.manifestPath,
      config.settingsGradlePath,
      detoxTestJavaPath,
      PATHS["app/build.gradle"],
    ],
    from: /com.example/g,
    to: config.packageName,
  });

  // gradle.settings
  fs.appendFileSync(config.settingsGradlePath, "include ':detox'\n");
  fs.appendFileSync(
    config.settingsGradlePath,
    "project(':detox').projectDir = new File(rootProject.projectDir, '../node_modules/detox/android/detox')"
  );

  console.log(DONE);
};
