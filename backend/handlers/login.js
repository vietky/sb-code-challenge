const {
    User
} = require('../models')

const {
    authenticationCache
} = require('../caches/')

module.exports = function login (req, res) {
    const {
        username,
        password
    } = req.body
    return User.findOne({
        where: {
            user_name: username
        }
    }).then((rawUser) => {
        const user = rawUser.get({ plain: true })

        // TODO: should hash the password here...
        if (user.password !== password) {
            return Promise.reject(new Error(`Wrong password`))
        }
        return authenticationCache.create(user.id)
            .then((token) => {
                delete user.password
                user.token = token.token
                return Promise.resolve(user)
            })
    })
}