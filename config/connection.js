const mysql = require('mysql2');

const connectDb = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: process.env['DB_PASSWORD'],
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  connectDb.connect(function (err) {
    if (err) throw err;
  });

  module.exports = connectDb;