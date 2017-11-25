const _ = require('lodash')
const { sequelize, Question, UserAction } = require('../models')
const {
    USER_ACTIONS,
    DEFAULT_AUDIENCE_ID
} = require('../configs/app_constants')

function vote (req) {
    const user_id = DEFAULT_AUDIENCE_ID
    const {
        question_id
    } = req.params
    const ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress
    return sequelize.transaction((transaction) => {
        return Question.findOne({
            where: {
                id: question_id
            },
            transaction
        }).then((question) => {
            if (!question) {
                return Promise.reject(new Error(`Question_id ${question_id} is not available to vote`))
            }
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
                        event_id: question.event_id
                    },
                    type: sequelize.QueryTypes.SELECT,
                    transaction
                })
                .then((likes) => {
                    if (likes.length < 1) {
                        // user has no vote, allow him to vote
                        return UserAction.create({
                            user_id,
                            action_name: USER_ACTIONS.VOTE,
                            question_id,
                            ip
                        }, {
                            transaction
                        })
                    }
                    // let's assume that number of questions in a room is not too much....
                    const like = _.find(likes, (item) => item.question_id == question_id)
                    if (!like) {
                        return Promise.reject(new Error(`You can't quote more than 1 question in an event`))
                    }
                    // user unvotes
                    return UserAction.destroy({
                        where: {
                            id: like.id
                        }
                    })
                })
        })
    })
}

module.exports = {
    vote
}