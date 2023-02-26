// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const db = require('./db');
const express = require('express');
const inquirer = require('inquirer');
const connection = require('./config/connection');
const logo = require('asciiart-logo');

require('console.table');
require('asciiart-logo');

const runMenu = [
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
];

function init() {
  inquirer
    .prompt(runMenu)
    .then(res => {
      if(res.menu === 'VIEW_DEPARTMENTS') {
          viewDepartments();
        } else if(res.menu === 'VIEW_ROLES') {
            viewRoles();
          } else if(res.menu === 'VIEW_EMPLOYEES') {
              viewEmployees();
            } else if(res.menu === 'ADD_DEPARTMENT') {
                addDepartment();
              } else if(res.menu === 'ADD_ROLE') {
                  addRole();
                } else if(res.menu === 'ADD_EMPLOYEE') {
                    addEmployee();
                  } else if(res.menu === 'UPDATE_EMPLOYEE_ROLE') {
                      updateEmployeeRole();
                    } else if(res.menu === 'UPDATE_EMPLOYEE_MANAGER') {
                        updateEmployeeManager();
                      } else if(res.menu === 'VIEW_EMPLOYEES_BY_MANAGER') {
                          viewEmployeesByManager();  
                        } else if(res.menu === 'VIEW_EMPLOYEES_BY_DEPARTMENT') {
                            viewEmployeesByDepartment();
                          } else if(res.menu === 'DELETE_DEPARTMENT') {
                              deleteDepartment();
                            } else if(res.menu === 'DELETE_ROLE') {
                                deleteRole();
                              } else if(res.menu === 'DELETE_EMPLOYEE') {
                                  deleteEmployee();  
                                } else(res.menu === 'Exit'); {
                                  Exit()
                                  }                   
    })                             
};
init();
//view all departments
function viewDepartments() {
  db.findAllDepartments()
   .then(([rows]) => {
      let departments = rows;
      console.log('\n') 
      console.table(departments); 
  })
  .then(() => init());
}
//view all roles
function viewRoles() {
  db.findAllRoles()
   .then(([rows]) => {
      let roles = rows;
      console.log('\n') 
      console.table(roles); 
  })
  .then(() => init());
}
//view all employees
function viewEmployees() {
  db.findAllEmployees()
   .then(([rows]) => {
      let employees = rows;
      console.log('\n') 
      console.table(employees); 
  })
  .then(() => init());
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
    .then(() => init());
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
    .then(() => init());
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
    .then(() => init());
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
    .then(res => db.findAllEmployeesByManager(res.managerId))
    .then(([rows]) => {
      let employees = rows;
      console.log('\n');
      console.table(employees);
    })
    .then(() => init());
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
    .then(() => init());
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
        .then(() => init());
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
      const managerChoices = managers.map(({ id, first_name, last_name })=>({
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
          name: `${first_name} ${last_name}`,
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
        .then(() => init());
        }) 
      });
      });
    }
    //delete a department
function deleteDepartment() {
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
        message: 'What department would you like to delete?',
        choices: departmentChoices
      }
    ])
    .then(res => db.deleteDepartment(res.departmentId))
    .then(() => console.log('Department deleted from the database'))
    .then(() => init());
  });
}
//delete a role
function deleteRole() {
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
        message: 'What role would you like to delete?',
        choices: roleChoices
      }
    ])
    .then(res => db.deleteRole(res.roleId))
    .then(() => console.log('Role deleted from the database'))
    .then(() => init());
  });
}
//delete new employee
function deleteEmployee() {
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
        message: 'What employee would you like to delete?',
        choices: employeeChoices
      }
    ])
    .then(res => db.deleteEmployee(res.employeeId))
    .then(() => console.log('Employee deleted from the database'))
    .then(() => init());
  });
}
 // Exit the application
 function Exit() {
  console.log("Goodbye!");
  process.exit();
}

process.exit