#!/usr/bin/env node
"use strict";

const clear = require("clear");
const chalk = require("chalk");
const figlet = require("figlet");
const { updateFiles, installPackages, detoxInit } = require("./lib");
const reactNativeConfig = require("./lib/reactNativeConfig");

clear();

console.log(
  chalk.green(figlet.textSync("Setting up Detox", { horizontalLayout: "full" }))
);

async function init() {
  const config = await reactNativeConfig();
  installPackages();
  detoxInit(config.project.android);
  await updateFiles(config.project.android);
}

init()
  .then(() => console.log(chalk.green("Installation complete")))
  .catch(console.error);
