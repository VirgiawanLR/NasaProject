const EnvConfig = require("./env");

EnvConfig.execute("../..");

module.exports = {
  port: process.env.PORT,
};
