const logger = require('../libs/logger');

module.exports = (handler, req, res) => {
    return handler(req, res)
        .then((resp) => {
            res.json(resp)
                .end()
        })
        .catch((error) => {
            logger.error(error);
            res.json(error)
                .end();
        })
}