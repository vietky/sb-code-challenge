const { sequelize, Event, Question } = require('../models')
const {
    MAX_HIGH_LIGHT_QUESTIONS,
    DEFAULT_AUDIENCE_ID
} = require('../configs/app_constants')

function validate (params, transaction) {
    if (params.is_highlighted == true) {
        const question_id = params.question_id
        return sequelize.query(`
        SELECT event_id, COUNT(1) count
        FROM questions
        WHERE event_id IN (
            SELECT event_id
            FROM questions
            WHERE question_id = :question_id
            LIMIT 1
        )
        GROUP BY event_id
        LIMIT 1
        `, {
            replacements: {
                question_id: params.question_id
            },
            type: sequelize.QueryTypes.SELECT,
            transaction
        }).then((result) => {
            if (result.length === 0) {
                return Promise.reject(new Error(`There is no question with id ${question_id}`))
            }
            if (result[0].count >= MAX_HIGH_LIGHT_QUESTIONS) {
                return Promise.reject(new Error(`You can't highlight more than ${MAX_HIGH_LIGHT_QUESTIONS} questions`))
            }
            return Promise.resolve(true)
        })
    }
    return Promise.resolve(true)
}

function create (req) {
    const user_id = DEFAULT_AUDIENCE_ID
    const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const event_code = req.params.event_code
    const {
        description
    } = req.body
    return sequelize.transaction((t) => {
        return Event.findOne({
            where: {
                code: event_code
            }
        }).then((rawEvent) => {
            if (!rawEvent) {
                return Promise.reject(new Error(`Could not find event_code ${event_code}`))
            }
            const event = rawEvent.get({ plain: true })
            return Question.create({
                user_id,
                ip,
                description,
                event_id: event.id,
                is_shown: true,
                is_highlighted: false
            })
        })
    })
}

function update (req) {
    const params = {}
    params.question_id = req.params.question_id
    if (req.description) {
        params.description = req.description
    }
    if (req.is_highlighted) {
        params.is_highlighted = req.is_highlighted
    }
    if (req.is_shown) {
        params.is_shown = req.is_shown
    }
    return sequelize.transaction((t) => {
        return validate(params, t)
            .then(() => {
                return Question.update(params, {
                    where: {
                        question_id: params.question_id
                    },
                    transaction: t
                })
            })
    })
}

function hide (req) {
    return update({
        question_id: req.params.question_id,
        body: {
            is_shown: false,
            is_highlighted: false
        }
    })
}

module.exports = {
    create,
    update,
    hide
}