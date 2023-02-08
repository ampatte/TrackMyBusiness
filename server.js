// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const mysql = require('mysql2');
const express = require('express')
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

const db_menu = [
{
  type: 'list',
  name: 'menu',
  message: 'What would you like to do?',
  choices: [
    'View all departments', 
    'View all roles',
    'View all employees',
    'Add a department',
    'Add a role',
    'Add an employee',
    'Update an employee role',
    'Exit'
  ],
},  
]
const add_department = [
{
  type: 'input',
  name: 'dept',
  message: 'What department would you like to add?',
}
],
const add_employee = [
  {
    type: 'input',
    name: 'employee',
    message: 'What employee would you like to add?',
  }
],
const update_employee = [
  {
    type: 'input',
    name: 'employee',
    message: 'What employee would you like to add?',
  }
],

function runMenu() {
  return inquirer.prompt(db_menu)
   .then((input) => {console.log(input)
      if(input.menu === 'View all departments') {
        view_dept();
      } else if(input.menu === 'View all roles') {
          view_role();
        } else if(input.menu === 'View all employees') {
            view_emp();
          } else if(input.menu === 'Add a department') {
              add_dept();
            } else if(input.menu === 'Add a role') {
                add_role();
              } else if(input.menu === 'Add a employee') {
                  add_emp();
                } else if(input.menu === 'Update an employee role') {
                    update_emp();
                  } else(input.menu === 'Exit') {
                      buildTeam();
                        console.log("Team Profile Generated!")
                    }
   });
}

function add_dept() {
  return inquirer.prompt(add_department)
   .then((input) => {
      const department = new department(input.title, input.salary, input.dept_id);
      team.push(department);
       console.log(input) 
       runMenu();
  });
}
function add_role() {
  return inquirer.prompt(add_role)
   .then((input) => {
      const role = new role(input.title, input.salary, input.dept_id);
      team.push(role);
       console.log(input) 
       runMenu();
  });
}
function add_emp() {
  return inquirer.prompt(add_employee)
   .then((input) => {
      const employee = new employee(input.title, input.salary, input.dept_id);
      team.push(employee);
       console.log(input) 
       runMenu();
  });
}
function update_emp() {
  return inquirer.prompt(update_emp)
   .then((input) => {
      const employee = new employee(input.title, input.salary, input.dept_id);
      team.push(employee);
       console.log(input) 
       runMenu();
  });
}
function buildTeam() {
  return inquirer.prompt(menu)
   .then((input) => {console.log(input)
      
          //console.log("Team Profile Generated!")
    }
  ); 
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