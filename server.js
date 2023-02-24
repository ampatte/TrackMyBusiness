// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const mysql = require('mysql2');
const express = require('express')
const Query = require('mysql2/typings/mysql/lib/protocol/sequences/Query');
const connection = require('./connection');

app.use(express.urlencoded({extended: false}));
app.use(express.json());


const db_menu = [
{
  type: 'list',
  name: 'menu',
  message: 'What would you like to do?',
  choices: [
  {
    name: 'View all Departments',
    value: 'VIEW_DEPARTMENTS',
  }, 
  {
    name:'View all Roles',
    value: 'VIEW_ROLES',
  },
  {
    name:'View all Employees',
    value: 'VIEW_EMPLOYEES',
  },
  {
    name:'Add a Department',
    value: 'ADD_DEPARTMENT',
  },
  {
    name:'Add a Role',
    value: 'ADD_ROLE',
  },
  {
    name:'Add an Employee',
    value: 'ADD_EMPLOYEE',
  },
  {
    name:'Update an Employee Role',
    value: 'UPDATE_EMPLOYEE_ROLE',
  },
   {
    name:'Update Employee Managers',
    value: 'UPDATE_EMPLOYEE_MANAGERS',
  },
  {
    name:'View Employees by Manager',
    value: 'VIEW_EMPLOYEES_BY_MANAGER',
  },
   {
    name:'View Employees by department',
    value: 'VIEW_EMPLOYEES_BY_DEPARTMENT',
  },
  {
    name:'delete Departments',
    value: 'DELETE_DEPARTMENTS',
  },
  {
    name:'delete Roles',
    value: 'DELETE_ROLES',
  },
  {
    name:'delete Employees',
    value: 'DELETE_EMPLOYEES',
  },
  {  
    name: 'Exit',
    value: 'Exit',
  },
  ],
},  
]

function db_menu()

function runMenu() {
  return inquirer.prompt(db_menu)
   .then((input) => {console.log(input)
      if(input.menu === 'VIEW_DEPARTMENTS') {
        viewDepartments();
      } else if(input.menu === 'VIEW_ROLES') {
          viewRoles();
        } else if(input.menu === 'VIEW_EMPLOYEES') {
            viewEmployees();
          } else if(input.menu === 'ADD_DEPARTMENT') {
              addDepartment();
            } else if(input.menu === 'ADD_ROLE') {
                addRole();
              } else if(input.menu === 'ADD_EMPLOYEE') {
                  addEmployee();
                } else if(input.menu === 'UPDATE_EMPLOYEE_ROLE') {
                    updateEmployeeRole();
                  } else if(input.menu === 'UPDATE_EMPLOYEE_MANAGER') {
                      updateEmployeeManager();
                    } else if(input.menu === 'VIEW_EMPLOYEES_BY_MANAGER') {
                        viewEmployeesByManager();  
                      } else if(input.menu === 'VIEW_EMPLOYEES_BY_DEPARTMENT') {
                          viewEmployeesByDepartment();
                        } else(input.menu === 'Exit'); {
                            Exit();
                          }
   });
}
//view all departments
function viewDepartments() {
  db.findAllDepartments()
   .then(([rows]) => {
      let departments = rows;
      console.log('\n') 
      console.table(departments); 
  })
  .then(() => runMenu());
}
//view all roles
function viewRoles() {
  db.findAllRoles()
   .then(([rows]) => {
      let roles = rows;
      console.log('\n') 
      console.table(roles); 
  })
  .then(() => runMenu());
}
//view all employees
function viewEmployees() {
  db.findAllEmployees()
   .then(([rows]) => {
      let employees = rows;
      console.log('\n') 
      console.table(employees); 
  })
  .then(() => runMenu());
}
//add a department
function addDepartment() {
  db.findAllDepartments()
  .then(([rows]) => {
     let departments = rows
     const departmentChoices = departments.map(({ id, name }) => ({
     name: name,
     value: id,
}));
  prompt([
    {
      type: 'input',
      name: 'dept',
      message: 'What department would you like to add?',
      choices: departmentChoices
    }
  ])
  .then(res => db.addDepartment(res.departmentId))
  .then(() => console.log('New department added to the database'))
  .then(() => runMenu());
    });
}
//add a role
function addRole() {
  db.findAllRoles()
  .then(([rows]) => {
     let roles = rows
     const roleChoices = roles.map(({ id, name }) => ({
     name: name,
     value: id,
}));
  prompt([
    {
      type: 'input',
      name: 'dept',
      message: 'What role would you like to add?',
      choices: roleChoices
    }
  ])
  .then(res => db.addRole(res.roleId))
  .then(() => console.log('New role added to the database'))
  .then(() => runMenu());
    });
}
//add new employee
function addEmployee() {
  db.findAllEmployees()
  .then(([rows]) => {
     let employees = rows
     const employeeChoices = employees.map(({ id, first_name, last_name}) => ({
     name: `${first_name} ${last_name}`,
     value: id,
}));
  prompt([
    {
      type: 'input',
      name: 'dept',
      message: 'What employee would you like to add?',
      choices: employeeChoices
    }
  ])
  .then(res => db.addEmployee(res.employeeId))
  .then(() => console.log('New employee added to the database'))
  .then(() => runMenu());
    });
}
//view all employees by manager
function viewEmployeesByManager() {
  db.findAllEmployees()
   .then(([rows]) => {
      let managers = rows
      const managerChoices = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
}));
  prompt([
    {
      type: 'list',
      name: 'managerId',
      message: "Which manager would you like to see employees for?",
      choices: managerChoices
    }
  ])
    .then(res => db.findAllEmployeesByDepartment(res.managerId))
    .then(([rows]) => {
      let employees = rows;
      console.log('\n');
      console.table(employees);
    })
    .then(() => runMenu());
  });
}
//view all employees by department
function viewEmployeesByDepartment() {
  db.findAllDepartments()
   .then(([rows]) => {
      let departments = rows
      const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
}));
  prompt([
    {
      type: 'list',
      name: 'departmentId',
      message: "Which department would you like to see employees for?",
      choices: departmentChoices
    }
  ])
    .then(res => db.findAllEmployeesByDepartment(res.departmentId))
    .then(([rows]) => {
      let employees = rows;
      console.log('\n');
      console.table(employees);
    })
    .then(() => runMenu());
  });
}
//update an employee role
function updateEmployeeRole() {
  db.findAllEmployees()
   .then(([rows]) => {
    let employees =rows;  
    const employeeChoices = employees.map(({ id, first_name, last_name})=>({
     name: `${first_name} ${last_name}`,
     value: id,
    }));
    const roleChoices = roles.map(({ id, title })=>({
      name: title,
      value: id,
     }));
     prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: "Which employee's role would you like to update?",
        choices: employeeChoices
      }
    ])
      .then(res => {
        let employeeId = res.employeeId;
        db.findAllRoles()
      .then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title}) => ({
          name: title,
          value: id
        }));
        prompt([
          {
            type: 'list',
            name: 'employeeId',
            message: "Which role would you like to assign to the selected employee?",
            choices: roleChoices
          }
        ])
        .then(res => db.updateEmployeeRole(employeeId, res.roleId))
        .then(() => console.log("Employee's role is now updated!"))
        .then(() => runMenu());
        }) 
      });
    })
  }
 // update an employee's manager    
  function updateEmployeeManager() {
    db.findAllEmployees()
     .then(([rows]) => {
      let employees =rows;  
      const employeeChoices = employees.map(({ id, first_name, last_name})=>({
       name: `${first_name} ${last_name}`,
       value: id,
      }));
      const managerChoices = roles.map(({ id, first_name, last_name })=>({
        name: `${first_name} ${last_name}`,
        value: id,
       }));
       prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: "Which employee's manager would you like to update?",
          choices: employeeChoices
        }
      ])
      .then(res => {
        let employeeId = res.employeeId;
        db.findAllManagers()
      .then(([rows]) => {
        let managers = rows;
        const managerChoices = managers.map(({ id, first_name, last_name }) => ({
          name: first_name, last_name,
          value: id
        }));
        prompt([
          {
            type: 'list',
            name: 'employeeId',
            message: "Which manager would you like to assign to the selected employee?",
            choices: managerChoices
          }
        ])
        .then(res => db.updateEmployeeManager(employeeId, res.managerId))
        .then(() => console.log("Employee's manager is now updated!"))
        .then(() => runMenu());
        }) 
      });
      });
    }
 // Exit the application
 function exit() {
  console.log("Goodbye!");
  process.exit();
}

process.exit