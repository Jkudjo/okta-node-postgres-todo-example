'use strict'

const Sequelize = require('sequelize');

class ToDoItem extends Sequelize.Model { }

const initSequelize = function (config) {
   
    var sequelize = new Sequelize(config.database, config.user, config.password, {
        host: config.server,
        dialect: 'postgres',
        define: {
            freezeTableName: true,
            timestamps: false
        }
    });

    ToDoItem.init({
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        iscomplete: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'item'
    });
}

const repository = function (config) {

    var sequelize = initSequelize(config);

    const disconnect = function () {
        sequelize.close();
    }  

    const createToDoItem = function (title, description) {
        
        return ToDoItem.create(
            {
                title: title,
                description: description,
                iscomplete: false
            });
    }  

    const markAsComplete = function (id) {
        return ToDoItem.update(
           {               
               iscomplete: true
           },
           {
               where: {
                   id: id
               }
           });
   }  

    const getAllIncompleteToDoItems = function () {
        return ToDoItem.findAll({
            where: {
                iscomplete: false
            }
        });
    } 

    return Object.create({
        disconnect,
        createToDoItem,
        getAllIncompleteToDoItems,
        markAsComplete
    });

}

const connect = function (connection) {
    return new Promise(function (resolve, reject) {
        if (!connection) {
            reject(new Error("Error connecting to Db"));
        }

        resolve(repository(connection));
    });
}

module.exports = Object.assign({}, { connect });
