const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {
    admin,
    audience,
    common
} = require('./routers/');
const logger = require('./libs/logger');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/admins', admin)
app.use('/audiences', audience)
app.use('/', common)

process.on('unhandledRejection', (error, p) => {
    logger.error('Unhandled Rejection at: Promise', p, 'reason:', error, error.stack);
    // application specific logging, throwing an error, or other logic here
});

app.listen(3000, () => logger.info('Shop Back api listening on port 3000!'))