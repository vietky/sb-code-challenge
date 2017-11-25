const Sequelize = require('sequelize')
const sequelize = require('./sequelize')

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_name: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    role_id: { type: Sequelize.INTEGER },
    created_date: { type: Sequelize.DATE, field: 'created_date', defaultValue: Sequelize.NOW },
    updated_date: { type: Sequelize.DATE, field: 'created_date', defaultValue: Sequelize.NOW }
}, {
    tableName: 'users',
    timestamps: false
})

module.exports = User