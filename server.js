// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const mysql = require('mysql2');
const express = require('express')
const inquirer = require('inquirer');
const Query = require('mysql2/typings/mysql/lib/protocol/sequences/Query');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env['DB_PASSWORD'],
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);
//app.get()
const db_menu = [
  {
    type: 'list',
    name: 'menu',
    message: 'What would you like to do?',
    choices: ['View all departments', 
              'View all roles',
              'View all employees',
              'Add a department',
              'Add a role',
              'Add an employee',
              'Update an employee role'
            ],
        },
    ]
]
const add_dept = [
  {
    type: 'input',
    name: 'dept',
    message: 'What department would you like to add?',
  }
]
  const employee = [
    {
      type: 'input',
      name: 'employee',
      message: 'What employee would you like to add?',
    }
  ]
  'Update an employee role'
  const add_employee = [
    {
      type: 'input',
      name: 'employee',
      message: 'What employee would you like to add?',
    }

//Query
db.query('SELECT *FROM department', function (err, results){
  console.log(results);
});

app.use((req, res) => {
  res.status(404).end();
});













app.listen(port, () => {
console.log(`Server running on port ${PORT}`);
});