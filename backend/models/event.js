const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

const Event = sequelize.define('events', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    code: { type: Sequelize.STRING },
    start_date: { type: Sequelize.DATE },
    end_date: { type: Sequelize.DATE },
    createdAt: { type: Sequelize.DATE, field: 'created_date' },
    updatedAt: { type: Sequelize.DATE, field: 'modified_date' }
}, {
    tableName: 'events'
})

module.exports = Event