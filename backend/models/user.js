const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

const User = sequelize.define('users', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    user_name: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    role_id: { type: Sequelize.INTEGER },
    createdAt: { type: Sequelize.DATE, field: 'created_date' },
    updatedAt: { type: Sequelize.DATE, field: 'modified_date' }
}, {
    tableName: 'users'
})

module.exports = User