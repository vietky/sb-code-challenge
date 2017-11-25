const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

const Question = sequelize.define('questions', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    description: { type: Sequelize.STRING },
    event_id: { type: Sequelize.INTEGER },
    created_date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    modified_date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
}, {
    tableName: 'questions'
})

module.exports = Question