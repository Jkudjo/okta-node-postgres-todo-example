const serverSettings = {
    port: process.env.PORT || 3000
}

const dbSettings = {
    database: process.env.DB || 'todolist',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'Nf879456',
    server: process.env.DB_SERVER || 'localhost'
}

const oktaSettings = {
    clientId: process.env.OKTA_CLIENTID || '0oa1ktkddi0F0QF52357',
    clientSecret: process.env.OKTA_CLIENTSECRET || '8Oz-3DPPLG4Jhg2fNNXFdsmuz2_41n6Y7svK2tkF',
    url: process.env.OKTA_URL_BASE || 'https://dev-332742.okta.com',
    apiToken: process.env.OKTA_API_TOKEN || '00YBW2KD1F9PRERoxY-6rtJ1lO0X90fU3QPsx9jkZ2',
    appBaseUrl: process.env.OKTA_APP_BASE_URL || 'http://localhost:3000'
}

module.exports = Object.assign({}, { dbSettings, serverSettings, oktaSettings });