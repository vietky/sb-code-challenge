const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

const Question = sequelize.define('questions', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    description: { type: Sequelize.STRING },
    event_id: { type: Sequelize.INTEGER },
    is_highlighted: { type: Sequelize.BOOLEAN },
    is_shown: { type: Sequelize.BOOLEAN },
    createdAt: { type: Sequelize.DATE, field: 'created_date' },
    updatedAt: { type: Sequelize.DATE, field: 'modified_date' }
}, {
    tableName: 'questions'
})

module.exports = Question