const { authenticationCache } = require('../caches/')

module.exports = function authenticate (req, res, next) {
    const tokenString = (req.headers['authorization'] || '').replace('Bearer ', '').trim()
    return authenticationCache.get(tokenString)
        .then((token) => {
            if (!token) {
                res.status(404)
                    .json({
                        message: `Unauthorized`
                    })
                return
            }
            req.user_id = token.user_id
            next()
        })
}