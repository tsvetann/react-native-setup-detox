const execa = require("execa");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

module.exports = function detoxInit() {
  console.log(chalk.yellow("Initializing Detox"));

  if (!fs.existsSync(path.join(process.cwd(), "e2e"))) {
    try {
      execa.sync("detox", ["init", "-r", "jest"], {
        cwd: process.cwd(),
        stdio: "inherit",
      });
    } catch (error) {
      console.log(error);
    }
  }
};
