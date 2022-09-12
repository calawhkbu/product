const config = require('./config.json')
const root = require('path').resolve('./')
require('dotenv').config();



const express = require('express')
const app = express()

const router = require(root + '/src/routes/router')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.disable('X-Powered-By')
app.disable('x-powered-by')
app.all('*', function (req, res, next) {
    res.removeHeader("X-Powered-By");
    res.removeHeader("x-powered-by");

    next();
});


app.use(router)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




var http = require('http');
var httpServer = http.createServer(app);
httpServer.listen(config.PORT);

console.log(`Server running at PORT ${config.PORT}, Since ${new Date()}`)
//404
app.use(function (req, res) {
    res.status(404).json({ success: false, message: 'page not found' })
});