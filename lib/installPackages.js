const execa = require("execa");
const chalk = require("chalk");

const DONE = chalk.reset.inverse.bold.green(" DONE ");
const cwd = process.cwd();

module.exports = function installPackages() {
  console.log(chalk.yellow("Installing required packages!"));
  // global installs
  execa.sync("npm", ["install", "detox-cli", "-g"], {
    cwd,
    stdio: "inherit",
  });

  // dev dependecies
  execa.sync(
    "npm",
    ["install", "jest@^26.6.1", "jest-circus@^26.6.1", "detox", "--save-dev"],
    {
      cwd,
      stdio: "inherit",
    }
  );

  console.log(DONE);
};
