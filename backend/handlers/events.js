const _ = require('lodash')
const { Event, Question } = require('../models')

function getByUser (req, res) {
    const user_id = req.user_id
    return Event.findAll({
        where: {
            user_id
        }
    }).then((rawResults) => {
        const eventList = _.map(rawResults, (item) => item.get({ plain: true }))
        return Promise.resolve(eventList)
    })
}

function getByCode (req) {
    const code = req.params['event_code']
    return Event.findOne({
        where: {
            code
        }
    }).then((rawEvent) => {
        if (!rawEvent) {
            return Promise.resolve(null)
        }
        const event = rawEvent.get({ plain: true })
        return Question.findAll({
            where: {
                event_id: event.id
            }
        }).then((rawQuestions) => {
            event.questions = _.map(rawQuestions, (question) => question.get({ plain: true }))
            return Promise.resolve(event)
        })
    })
}

function create (req) {
    const user_id = req.user_id
    const {
        code,
        start_date,
        end_date
    } = req.body
    return Event.create({
        user_id,
        code,
        start_date,
        end_date
    })
}

function update (req) {
    const user_id = req.user_id
    const {
        code,
        start_date,
        end_date
    } = req.body
    return Event.update({
        start_date,
        end_date
    }, {
        where: {
            user_id,
            code: code
        }
    })
}

module.exports = {
    getByUser,
    getByCode,
    create,
    update
}