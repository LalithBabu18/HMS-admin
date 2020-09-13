process.env.VUE_APP_VERSION = require("./package.json").version;

require("dotenv").config();

process.env.VUE_APP_ENV_PATH = process.env.ENV_PATH;

module.exports = {
  lintOnSave: false,

  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  }
};
