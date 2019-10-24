'use strict'

const server = require('./server/server')
const config = require('./config/')
const repository = require('./repository/todolist_repository.js')

const { EventEmitter } = require('events');
const mediator = new EventEmitter();

mediator.on('boot.ready', function (dbConfig) {
    let rep;

    repository.connect(dbConfig)
        .then(repo => {
            
            console.log('Repository Conneted.  Starting Server');
            rep = repo;   
            
            return server.start({
                port: config.serverSettings.port,
                repo: repo,
                okta: config.oktaSettings
            })
        })
        .then(app => {
            console.log(`Server Started Successfully, running on port: ${config.serverSettings.port}.`);
            app.on('close', function () {
                rep.disconnect();
            })
        })
    })

mediator.on('db.error', function (error) {
    console.log(error);
});

mediator.emit('boot.ready', config.dbSettings);