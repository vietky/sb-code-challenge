const express = require('express')
const router = express.Router()

const {
    response,
    login
} = require('../handlers');

router.post('/login', response.bind(null, login))

module.exports = router;