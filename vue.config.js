const fs = require("fs")

module.exports = {
    transpileDependencies: ['vuetify'],
    devServer: {
        https: {
            key: fs.readFileSync("./certs/localhost-key.pem"),
            cert: fs.readFileSync("./certs/localhost.pem")
        },
        public: 'https://localhost:8081/'
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
