'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const db = {};


/**
 * 0 => production db
 * 1 => development db
 * 2 => test db
 */
const dbNames = process.env.POSTGRES_MULTIPLE_DATABASES.split(',');
let dbDname;
console.log(process.env)
switch(process.env.NODE_ENV) {
  case 'production':
    dbDname = dbNames[0];
    break;
  case 'development':
    dbDname = dbNames[1];
    break;
  case 'test':
    dbDname = process.env.POSTGRES_TEST_DB;
    break;  
  default:
    dbDname = dbNames[1];
}

console.log(dbDname);

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
  .filter((file) =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;