require('dotenv').config()

const name = process.env.DBNAME;
const username = process.env.DBUSERNAME;
const password = process.env.DBPASSWORD;
const host = process.env.DBHOST;


module.exports = {
  "development": {
    "username": process.env.DBUSERNAME,
    "password": process.env.DBPASSWORD,
    "database": process.env.DBNAME,
    "host": process.env.DBHOST,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": username,
    "password": password,
    "database": name,
    "host": host,
    "dialect": "mysql"
  }
}
