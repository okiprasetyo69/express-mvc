const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Transaction = sequelize.define('Transaction',{
    total_billing:{
        type:DataTypes.BIGINT,
        allowNull:false,
    },
    paid_payment:{
        type:DataTypes.BIGINT,
        allowNull:false,
    },
    outstanding_payment:{
        type:DataTypes.BIGINT,
        allowNull:false,
    },
    user_id:{
        type:DataTypes.BIGINT,
        allowNull:false,
    },
});

module.exports = Transaction;