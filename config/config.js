const dotenv = require('dotenv');

dotenv.config();

const serverSettings = {
    port: process.env.PORT || 3000
}

const dbSettings = {
    database: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_SERVER
}

const oktaSettings = {
    clientId: process.env.OKTA_CLIENT_ID,
    clientSecret: process.env.OKTA_CLIENT_SECRET,
    url: process.env.OKTA_URL_BASE,
    appBaseUrl: process.env.OKTA_APP_BASE_URL
}

module.exports = Object.assign({}, { dbSettings, serverSettings, oktaSettings });
