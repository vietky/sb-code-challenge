const moment = require('moment')
const {
    EXPIRED_TOKEN_INTERVAL
} = require('../configs/app_constants')
const string = require('../utils/string')

function generateToken(user_id, token, minutes) {
    const now = new Date()
    const expired_date = moment(now).add(minutes, 'minutes').toDate()
    return {
        user_id,
        token,
        created_date: now,
        expired_date
    }
}

class TokenCache {
    constructor() {
        this.byUserId = {}
        this.byToken = {}
    }
    set(token) {
        this.byUserId[token.user_id] = token
        this.byToken[token.token] = token
    }
    delete(token) {
        if (!token) {
            return
        }
        delete this.byUserId[token.user_id]
        delete this.byToken[token.token]
    }
    getByUserId(user_id) {
        return this.byUserId[user_id]
    }
    getByToken(tokenString) {
        return this.byToken[tokenString]
    }
}

let cache = new TokenCache()

function inject() {
    const token = `ioFPw1ukERfkXWGa1wAPuCRatSVDsCAC7vcTAysnStwVg6jq2X`
    const now = new Date()
    const expired_date = moment(now).add(30, 'minutes').toDate()
    cache.set({
        user_id: 1,
        token,
        created_date: now,
        expired_date
    })
}

// inject()

// a simple in-memory cache storing user token
// all of the functions here are using Promise just in case we change in-memory to redis cache
class AuthenticationToken {
    create(userId) {
        let token = cache.getByUserId(userId)
        cache.delete(token)

        token = generateToken(userId, string.generate(), EXPIRED_TOKEN_INTERVAL)
        cache.set(token)
        return Promise.resolve(token)
    }
    get(tokenString) {
        const token = cache.getByToken(tokenString)
        const now = new Date()
        if (!token || token.expired_date < now) {
            delete cache[tokenString]
            return Promise.resolve(null)
        }
        return Promise.resolve(token)
    }
    clear() {
        cache = new TokenCache()
    }
}

module.exports = new AuthenticationToken()