const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {
    admin,
    audience,
    common
} = require('./routers/');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/admins', admin)
app.use('/audiences', audience)
app.use('/', common)


app.listen(3000, () => console.log('Shop Back api listening on port 3000!'))