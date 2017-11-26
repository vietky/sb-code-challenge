const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

const Event = sequelize.define('events', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    code: { type: Sequelize.STRING },
    user_id: { type: Sequelize.INTEGER },
    start_date: { type: Sequelize.DATE },
    end_date: { type: Sequelize.DATE },
    created_date: { type: Sequelize.DATE, field: 'created_date', defaultValue: Sequelize.NOW },
    modified_date: { type: Sequelize.DATE, field: 'modified_date', defaultValue: Sequelize.NOW }
}, {
    tableName: 'events',
    timestamps: false
})

module.exports = Event