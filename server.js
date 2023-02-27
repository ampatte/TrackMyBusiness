// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const db = require('./db');
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const config = require('./package.json');
console.log(logo(config).render());

require('console.table');
require('asciiart-logo');

const runMenu = [
  {
    type: 'list',
    name: 'menu',
    message: 'What would you like to do?',
    choices: [
      'View all Departments',
      'View all Roles',
      'View all Employees',
      'Add a Department',
      'Add a Role',
      'Add an Employee',
      'Update an Employee Role',
      'Update Employee Manager',
      'View Employees by Manager',
      'View Employees by department',
      'Delete Departments',
      'Delete Roles',
      'Delete Employees',
      'Exit'
    ],
  },  
]

function init() {
  return inquirer.prompt(runMenu)
    .then((res) => { console.log(res)
      if(res.menu === 'View all Departments') {
          viewDepartments();
        } else if(res.menu === 'View all Roles') {
            viewRoles();
          } else if(res.menu === 'View all Employees') {
              viewEmployees();
            } else if(res.menu === 'Add a Department') {
                addDepartment();
              } else if(res.menu === 'Add a Role') {
                  addRole();
                } else if(res.menu === 'Add an Employee') {
                    addEmployee();
                  } else if(res.menu === 'Update an Employee Role') {
                      updateEmployeeRole();
                    } else if(res.menu === 'Update Employee Manager') {
                        updateEmployeeManager();
                      } else if(res.menu === 'View Employees by Manager') {
                          viewEmployeesByManager();  
                        } else if(res.menu === 'View Employees by department') {
                            viewEmployeesByDepartment();
                          } else if(res.menu === 'Delete Departments') {
                              deleteDepartment();
                            } else if(res.menu === 'Delete Roles') {
                                deleteRole();
                              } else if(res.menu === 'Delete Employees') {
                                  deleteEmployee();  
                                } else if(res.menu === 'Exit'); {
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
