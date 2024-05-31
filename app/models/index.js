const sequelize = require('../../config/database');
const User   = require('./user');
const Transaction = require('./transaction')
const TransactionDetail = require('./transaction_detail')

sequelize.sync().then(()=>{
    console.log('Database & Tables Created')
    console.log('Database & Tables Transaction Created')
    console.log('Database & Tables Transaction Detail Created')
})

module.exports = {
    User,
    Transaction,
    TransactionDetail
};