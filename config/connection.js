const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: process.env['DB_PASSWORD'],
      database: 'employee_db'
    },
  );

  connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected to the employee_db database.`)
  });

  module.exports = connection;