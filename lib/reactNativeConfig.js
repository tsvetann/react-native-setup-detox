const execa = require("execa");

module.exports = async function reactNativeConfig() {
  const { stdout } = await execa("npx", ["react-native", "config"], {
    cwd: process.cwd(),
  });

  return JSON.parse(stdout);
};
