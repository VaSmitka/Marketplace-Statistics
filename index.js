'use strict';

var path = require('path');
var http = require('http');

var oas3Tools = require('oas3-tools');

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();

const db = require("./models");
db.sequelize.sync({ force: true }).then(() => {

    console.log("Drop and re-sync db.");
    
});

// Initialize the Swagger middleware
http.createServer(app).listen(process.env.SERVER_PORT, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', process.env.SERVER_PORT, process.env.SERVER_PORT);
    console.log('Swagger-ui is available on http://localhost:%d/docs', process.env.SERVER_PORT);
    // console.log("ENV data", process.env)
});

