const EnvConfig = require("./env");

EnvConfig.execute("../..");

module.exports = {
  url: process.env.MONGO_URL,
  db_name: process.env.DB_NAME,
};
