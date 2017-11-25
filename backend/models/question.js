const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

const Question = sequelize.define('questions', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description: { type: Sequelize.STRING },
    event_id: { type: Sequelize.INTEGER },
    user_id: { type: Sequelize.INTEGER },
    ip: { type: Sequelize.STRING },
    is_highlighted: { type: Sequelize.BOOLEAN },
    is_shown: { type: Sequelize.BOOLEAN },
    created_date: { type: Sequelize.DATE, field: 'created_date', defaultValue: Sequelize.NOW },
    updated_date: { type: Sequelize.DATE, field: 'created_date', defaultValue: Sequelize.NOW }
}, {
    tableName: 'questions',
    timestamps: false
})

module.exports = Question