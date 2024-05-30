const sequelize = require('../../config/database');
const User   = require('./user');

sequelize.sync().then(()=>{
    console.log('Database & Tables Created')
})

module.exports = {
    User
};