'use strict'

module.exports = function (app, options) {

    const basepath = '/users';

    // Log a user out
    app.get(basepath + "/logout", (request, response, next) => {
        request.logout();
        response.redirect("/");
    });

    app.get(basepath + "/index", (request, response, next) => {
        if (!request.userContext) {
             return response.render("login");
        }
        else
        {
            return response.redirect("/");
        }
    });
}