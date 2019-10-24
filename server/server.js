'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const path = require("path");

const ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;
const session = require("express-session");

const items = require('../routes/items.js');
const users = require('../routes/users.js');

const start = function (options) {
    return new Promise(function (resolve, reject) {

        process.on('unhandledRejection', (reason, p) => {
            console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
        });

        if (!options.port) {
            reject(new Error("no port specificed"));
        }

        if (!options.repo) {
            reject(new Error("no repo"));
        }

        const app = express();

        app.set("views", path.join(__dirname, "../views"));
        app.set("view engine", "pug");

        app.use(bodyParser.urlencoded({ extended: false }));

        app.use(function (error, request, response, next) {
            reject(new Error("something went wrong" + error));
            response.status(500).send("something went wrong");
        });

        const oidc = new ExpressOIDC({
            issuer: options.okta.url + "/oauth2/default",
            client_id:  options.okta.clientId,
            client_secret: options.okta.clientSecret,
            appBaseUrl: options.okta.appBaseUrl,
            scope: 'openid profile',
            routes: {
              login: {
                path: "/users/login"
              },
              callback: {
                path: "/authorization-code/callback",
                defaultRedirect: "/"
              }
            }
          });

        app.use(session({
            secret: "ladhnsfolnjaerovklnoisag093q4jgpijbfimdposjg5904mbgomcpasjdg'pomp;m",
            resave: true,
            saveUninitialized: false
        }));

        app.use(oidc.router);

        items(app, options);
        users(app, null);

        const server = app.listen(options.port, function () {
            resolve(server);
        });
    });
}

module.exports = Object.assign({}, { start })