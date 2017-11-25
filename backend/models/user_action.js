const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

const UserAction = sequelize.define('user_actions', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    user_id: { type: Sequelize.INTEGER },
    action_name: { type: Sequelize.STRING },
    question_id: { type: Sequelize.INTEGER },
    createdAt: { type: Sequelize.DATE, field: 'created_date' },
    updatedAt: { type: Sequelize.DATE, field: 'modified_date' }
}, {
    tableName: 'user_actions'
})

module.exports = UserAction