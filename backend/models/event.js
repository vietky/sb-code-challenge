const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

const Event = sequelize.define('events', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    code: { type: Sequelize.STRING },
    start_date: { type: Sequelize.DATE },
    end_date: { type: Sequelize.DATE },
    created_date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    modified_date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
}, {
    tableName: 'events'
})

module.exports = Event