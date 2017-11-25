const _ = require('lodash')
const { sequelize, Event } = require('../models')

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

function getQuestionsByEventId (eventId, orderBy, asc = 'ASC') {
    switch (orderBy) {
        case 'created_date':
            return sequelize.query(`
        SELECT *
        FROM questions
        ORDER BY created_date ${asc}
    `, {
                replacements: {
                    event_id: eventId
                },
                type: sequelize.QueryTypes.SELECT
            })
        default:
            return sequelize.query(`
        SELECT q.*, CASE WHEN t.count IS NULL THEN 0 ELSE t.count END likes
        FROM questions q
        LEFT JOIN (
            SELECT question_id, COUNT(1) count
            FROM user_actions
            WHERE question_id IN (
                SELECT id
                FROM questions
                WHERE event_id = :event_id
            )
            GROUP BY question_id
        ) t ON q.id = t.question_id
        WHERE is_shown = true
        ORDER BY likes ${asc}, modified_date DESC
    `, {
                replacements: {
                    event_id: eventId
                },
                type: sequelize.QueryTypes.SELECT
            })
    }
}

function getByCode (req) {
    const code = req.params['event_code']
    const { order_by, ascending } = req.query
    return Event.findOne({
        where: {
            code
        }
    }).then((rawEvent) => {
        if (!rawEvent) {
            return Promise.resolve(null)
        }
        const event = rawEvent.get({ plain: true })
        return getQuestionsByEventId(event.id, order_by, ascending === '1' ? 'ASC' : 'DESC')
            .then((questions) => {
                event.questions = questions
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