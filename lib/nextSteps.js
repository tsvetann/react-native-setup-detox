const chalk = require("chalk");

module.exports = function nextSteps() {
  console.log(chalk.green("next steps:"));
  console.log(chalk.green("Setup your testing environment:"));
  console.log(
    chalk.green(
      "https://github.com/wix/Detox/blob/4fadc000b63f9039c0432b07d709518f95ff9f23/docs/Introduction.AndroidDevEnv.md"
    )
  );
  console.log(
    chalk.green(
      "[Detox build debug]: detox build --configuration android.emu.debug"
    )
  );
  console.log(
    chalk.green(
      "[Detox build release]: detox build --configuration android.emu.release"
    )
  );
  console.log(
    chalk.green(
      "[Detox run test]: detox test --configuration android.emu.debug"
    )
  );
};
