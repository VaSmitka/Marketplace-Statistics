'use strict';

const path = require('path');

const oas3Tools = require('oas3-tools');
const express = require('express');
const actuator = require('express-actuator');

const db = require("./models");

const app = express();

// swaggerRouter configuration
const options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
const openApiApp = expressAppConfig.getApp();

// hotfix !!!
for (let i = 2; i < openApiApp._router.stack.length; i++) {
    app._router.stack.push(openApiApp._router.stack[i])
}

// add actuators
app.use(actuator());

/*app.get('/tata', function (req, res) {
    console.log(oas3Tools);
    res.send(JSON.stringify(openApiApp._router.stack))
})*/

// add database
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});


app.listen(process.env.SERVER_PORT, () => {
    console.log('Your server is listening on port %d (http://localhost:%d)', process.env.SERVER_PORT, process.env.SERVER_PORT);
    console.log('Swagger-ui is available on http://localhost:%d/docs', process.env.SERVER_PORT);
});