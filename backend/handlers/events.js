const _ = require('lodash')
const { sequelize, Event } = require('../models')
const {
    USER_ACTIONS
} = require('../configs/app_constants')

function getByUser(req, res) {
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

function getQuestionsLikedByUser(event_id, user_id, ip) {
    return sequelize.query(`
    SELECT *
    FROM user_actions
    WHERE user_id = :user_id AND ip = :ip AND action_name = :action_name AND question_id IN (
        SELECT id
        FROM questions
        WHERE event_id = :event_id
    )
    `, {
        replacements: {
            ip,
            user_id,
            action_name: USER_ACTIONS.VOTE,
            event_id
        },
        type: sequelize.QueryTypes.SELECT
    }).then((actions) => {
        return Promise.resolve(_.map(actions, (item) => item.question_id));
    });
}

function getQuestionsByEventId(eventId, orderBy, asc = 'ASC') {
    if (orderBy !== 'created_date') {
        orderBy = 'likes'
    }
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
        ORDER BY ${orderBy} ${asc}
    `, {
        replacements: {
            event_id: eventId
        },
        type: sequelize.QueryTypes.SELECT
    })

}

function getByCode(req) {
    const userId = req.user_id ? parseInt(req.user_id, 10) || -1 : -1;
    const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress
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
        return Promise.all([
                getQuestionsByEventId(event.id, order_by, ascending === '1' ? 'ASC' : 'DESC'),
                getQuestionsLikedByUser(event.id, userId, ip)
            ])
            .then((results) => {
                event.questions = results[0];
                event.questionsLikedByUser = results[1];
                return Promise.resolve(event)
            })
    })
}

function create(req) {
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

function update(req) {
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