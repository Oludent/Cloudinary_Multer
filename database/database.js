const {Sequelize}= require('sequelize')


const name = process.env.DBNAME;
const username = process.env.DBUSERNAME;
const password = process.env.DBPASSWORD;
const host = process.env.DBHOST;


const sequelize = new Sequelize(name, username, password, {
    host: host,
    dialect: 'mysql'
})

module.exports = sequelize