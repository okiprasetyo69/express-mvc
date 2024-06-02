const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Transaction = require('./transaction');

const TransactionDetail = sequelize.define('TransactionDetail',{
    transaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'transactions',
          key: 'id'
        }
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    amount:{
        type:DataTypes.BIGINT,
        allowNull:false,
    },
    status_payment:{
        type:DataTypes.BIGINT,
        allowNull:false,
    },
    date:{
        type:DataTypes.DATE,
        allowNull:false,
    },
    due_date:{
        type:DataTypes.DATEONLY,
        allowNull:false,
    },
    paid_date:{
        type:DataTypes.DATEONLY,
        allowNull:false,
    },
    payment_receipt:{
        type:DataTypes.STRING,
        allowNull:false,
    },
});

Transaction.hasMany(TransactionDetail, { foreignKey: 'transaction_id', as: 'transaction_detail' });
TransactionDetail.belongsTo(Transaction, { foreignKey: 'transaction_id', as: 'transaction' });

module.exports = TransactionDetail;