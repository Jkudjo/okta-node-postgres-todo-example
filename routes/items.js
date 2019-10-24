'use strict'

const status = require('http-status')

module.exports = function (app, options) {

    const { repo } = options;
    const basepath = '';

    app.get(basepath, ensureAuthenticated, function(request, response){

        repo.getAllIncompleteToDoItems().then(items => 
            {
                response.render("home", {
                    user: request.userContext.userinfo,
                    items: items
                });
            })
            .catch(err =>{
                response.render("error");
            })
    })

    app.get(basepath + '/create', ensureAuthenticated, function(request, response){
        response.render("create");
    })

    app.post(basepath + '/items/create', ensureAuthenticated, function(request, response){

        repo.createToDoItem(request.body.title, request.body.description)
            .then(data => {
                response.redirect('/');
            })
            .catch(err =>{
                response.render("error");
            })       
    });

    app.post(basepath + '/items/complete', ensureAuthenticated, function(request, response){

        repo.markAsComplete(request.body.id)
            .then(data => {
                response.redirect('/');
            })
            .catch(err =>{
                response.render("error");
            })       
    });

    function ensureAuthenticated(request, response, next) {
        if (!request.userContext) {
          return response.status(401).redirect('../users/index');
        }

        next();
    }
}