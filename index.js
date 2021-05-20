'use strict';

var path = require('path');

var oas3Tools = require('oas3-tools');
var express = require('express');
var actuator = require('express-actuator');

var db = require('./models');
// var rabbitmq = require('./rabbitmq');
 
var app = express();

// register actuators
app.use(actuator());

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};
// set swagger api
var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var openApiApp = expressAppConfig.getApp();
// merge ecpress app and oas3Tools app
// hotfix!!!
for (var i = 2; i < openApiApp._router.stack.length; i++) {
    app._router.stack.push(openApiApp._router.stack[i])
}

// connect database
db.sequelize.sync({ force: true }).then(function() { 
    console.log("Drop and re-sync db."); 
});
// set database
app.db = db;

// connect event queue
// rabbitmq(db);

app.listen(process.env.SERVER_PORT, function() {
    console.log('Your server is listening on port %d (http://localhost:%d)', process.env.SERVER_PORT, process.env.SERVER_PORT);
    console.log('Swagger-ui is available on http://localhost:%d/docs', process.env.SERVER_PORT);
});