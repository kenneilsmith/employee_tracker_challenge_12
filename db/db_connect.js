const mysql = require('mysql2')
const dotenv = require('dotenv')
dotenv.config()

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE
    },
    console.log(`Connected to the employee_tracker_db database.`)
)

module.exports = db
