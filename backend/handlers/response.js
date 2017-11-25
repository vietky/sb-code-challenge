const logger = require('../libs/logger')

module.exports = (handler, req, res) => {
    return handler(req, res)
        .then((resp) => {
            res.json(resp)
                .end()
        })
        .catch((error) => {
            logger.error(error)
            res.status(404)
                .json({
                    message: error.message,
                    stack: error.stack
                })
                .end()
        })
}