'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var db = {};


/**
 * 0 => production db
 * 1 => development db
 * 2 => test db
 */
var dbNames = process.env.POSTGRES_MULTIPLE_DATABASES.split(',');
var dbDname;

switch(process.env.NODE_ENV) {
  case 'production':
    dbDname = dbNames[0];
    break;
  case 'development':
    dbDname = dbNames[1];
    break;
  case 'testing':
    dbDname = process.env.POSTGRES_TEST_DB;
    break;  
  default:
    dbDname = dbNames[1];
}

console.log("DB NAME", dbDname);

let sequelize = new Sequelize(
    dbDname,
    process.env.POSTGRES_USER, 
    process.env.POSTGRES_PASSWORD, 
    {
      host: process.env.DB_URL,
      dialect: process.env.DB_TYPE
    }
  );

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js')})
  .forEach(function(file) {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;