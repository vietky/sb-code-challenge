const {
    User
} = require('../models');

module.exports = function login(req, res) {
    console.log('arguments', arguments);
    const {
        username,
        password
    } = req.body;
    return User.findOne({
        where: {
            user_name: username
        }
    }).then((rawUser) => {
        const user = rawUser.get({ plain: true })
        console.log('user', user)
            // TODO: should hash the password here...
        if (user.password == password) {
            delete user.password;
            return Promise.resolve(user);
        }
        return Promise.reject({
            message: `Wrong password`
        })
    })
}