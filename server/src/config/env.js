const { stage } = require("./stage");

class EnvConfig {
  constructor(stage) {
    this.stage = stage;
    this.path = require("path");
  }

  execute(path) {
    require("dotenv").config({
      path: this.path.resolve(__dirname, path, `.env.${this.stage}`),
    });
  }

  check(path) {
    console.log(this.path.resolve(__dirname, path, `.env.${this.stage}`));
  }
}

module.exports = new EnvConfig(stage);
