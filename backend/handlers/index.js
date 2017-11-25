const response = require('./response')
const login = require('./login')
const events = require('./events')
const questions = require('./questions')
const user_actions = require('./user_actions')

module.exports = {
    login: wrapResponseHandler(login, response),
    events: remapHandler(events),
    questions: remapHandler(questions),
    user_actions: remapHandler(user_actions),
    defaultCallback: (req, res) => {
        res.send('This site is underconstruction')
    }
}

function remapHandler (handlerObj) {
    for (let key in handlerObj) {
        handlerObj[key] = wrapResponseHandler(handlerObj[key], response)
    };
    return handlerObj
}

function wrapResponseHandler (handler, response) {
    return response.bind(null, handler)
}