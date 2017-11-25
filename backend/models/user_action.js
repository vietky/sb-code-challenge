const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

const UserAction = sequelize.define('user_actions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: { type: Sequelize.INTEGER },
    ip: { type: Sequelize.STRING },
    action_name: { type: Sequelize.STRING },
    question_id: { type: Sequelize.INTEGER },
    created_date: { type: Sequelize.DATE, field: 'created_date', defaultValue: Sequelize.NOW }
}, {
    tableName: 'user_actions',
    timestamps: false
})

module.exports = UserAction