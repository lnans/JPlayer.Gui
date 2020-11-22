const fs = require("fs");

module.exports = {
    transpileDependencies: ['vuetify'],
    devServer: {
        host: "localhost",
        https: {
            key: fs.readFileSync("./certs/localhost-key.pem"),
            cert: fs.readFileSync("./certs/localhost.pem")
        }
    },
    pluginOptions: {
        i18n: {
            locale: "en",
            fallbackLocale: "en",
            localeDir: "locales",
            enableInSFC: false
        }
    }
}
