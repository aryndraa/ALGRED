const {DataTypes} = require('sequelize');
const sequelize = require('../server/db');

const Harvest = sequelize.define('Harvest', {
    amount : {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    created_at: {
        defaultValue: DataTypes.NOW,
        type: DataTypes.DATE,
    }
}, {
    timestamps: false, 
    tableName: 'algred'  
})

module.exports = Harvest;   