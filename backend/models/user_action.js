const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

const UserAction = sequelize.define('user_actions', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    user_id: { type: Sequelize.INTEGER },
    action_name: { type: Sequelize.STRING },
    question_id: { type: Sequelize.INTEGER },
    created_date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    modified_date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
}, {
    tableName: 'user_actions'
})

module.exports = UserAction