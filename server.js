// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const db = require('./db');
const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const config = require('./package.json');
const { prompt } = require('inquirer');
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
      'Delete a Department',
      'Delete a Role',
      'Delete an Employee',
      'Exit'
    ],
  },  
]

init();

function init() {
  return inquirer.prompt(runMenu)
    .then((res) => {
      console.log(res);
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
                          } else if(res.menu === 'Delete a Department') {
                              deleteDepartment();
                            } else if(res.menu === 'Delete a Role') {
                                deleteRole();
                              } else if(res.menu === 'Delete an Employee') {
                                  deleteEmployee();  
                                } else if(res.menu === 'Exit') {
                                  exit();
                                  }                   
    }) 
    .catch((err) => {
      console.log (err);
      process.exit(1);
    });                            
};

//view all departments
function viewDepartments() {
  db.findAllDepartments()
   .then(([rows]) => {
      let departments = rows;
      console.log('\n') 
      console.table(departments); 
  })
  .then(() => init())
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
}
//view all roles
function viewRoles() {
  db.findAllRoles()
   .then(([rows]) => {
      let roles = rows;
      console.log('\n') 
      console.table(roles); 
  })
  .then(() => init())
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
}
//view all employees
function viewEmployees() {
  db.findAllEmployees()
   .then(([rows]) => {
      let employees = rows;
      console.log('\n') 
      console.table(employees); 
  })
  .then(() => init())
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
}
//add a department
function addDepartment() {
  prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the new department?',
      }
    ])
    .then(res => db.addDepartment(res.name))
    .then(() => console.log('New department added to the database')) 
    .then(() => init())
    .catch(err => console.error(err));
  }

//add a role
function addRole() {
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
        name: 'title',
        message: 'What role would you like to add?',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary for this role?'
      },
      {
        type: 'list',
        name: 'department',
        message: 'To what department does this role belong?',
        choices: departmentChoices
      }
    ]) 
    .then(res => db.addRole(res.title, res.salary, res.department))
    .then(() => console.log('New role added to the database'))
    .then(() => init())
  });
}
//add new employee
function addEmployee() {
  db.findAllRoles()
    .then(([rows]) => {
    let roles = rows
    const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id,
    }));
  db.findAllEmployees()
   .then(([rows]) => {
    let managers = rows
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'What is the employee first name?',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'What is the employee last name?',
      },
      {
        type: 'list',
        name: 'role',
        message: 'What is the employee role?',
        choices: roleChoices
      },
      {
        type: 'list',
        name: 'manager',
        message: 'Who is the employee manager?',
        choices: managerChoices
      },
    ])
    .then(res => db.addEmployee(res.first_name, res.last_name, res.role, res.manager))
    .then(() => console.log('New employee added to the database'))
    .then(() => init())
   
  })  
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
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
    .then(() => init())
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
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
      .then(() => init())
      .catch((err) => {
        console.log(err);
        process.exit(1);
    });
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
    prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: "Which employee would you like to update?",
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
            name: 'roleId',
            message: "Which role would you like to assign to the selected employee?",
            choices: roleChoices
          }
        ])
        .then(res => db.updateEmployeeRole(employeeId, res.roleId))
        .then(() => console.log("Employee's role is now updated!"))
        .then(() => init())
        .catch((err) => {
          console.log(err);
          process.exit(1);
        });
        }) 
      });
    })
  }
 // update an employee's manager    
 function updateEmployeeManager() {
  db.findAllEmployees()
    .then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));
    prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: "Which employee would you like to update?",
        choices: employeeChoices
      }
    ])
    .then(res => {
      let employeeId = res.employeeId;
      db.findAllEmployees()
        .then(([rows]) => {
        let managers = rows;
        const managerChoices = managers.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
        prompt([
          {
            type: 'list',
            name: 'managerId',
            message: "Which manager would you like to assign to the selected employee?",
            choices: managerChoices
          }
        ])
        .then(res => db.updateEmployeeManager(employeeId, res.managerId))
        .then(() => console.log("Employee's manager is now updated!"))
        .then(() =>  init())
        .catch((err) => {
          console.log(err);
          process.exit(1);
        })
      });
    });
  });
}


    //delete a department
function deleteDepartment() {
  return db.findAllDepartments()
  .then(([rows]) => {
     let departments = rows
     const departmentChoices = departments.map(({ id, name }) => ({
     name: name,
     value: id,
    }));
    console.log('before department list prompt')
    prompt([
      {
        type: 'list',
        name: 'departmentId',
        message: 'What department would you like to delete?',
        choices: departmentChoices
      }
    ])
    .then(res => {
      db.deleteDepartment(res.departmentId);
      return db.deleteDepartment(res.departmentId);
    })
    .then(() => console.log('Department deleted from the database'))
    .then(() => init())
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
    console.log('After department list prompt');
  });
}
//delete a role
function deleteRole() {
  db.findAllRoles()
  .then(([rows]) => {
      let roles = rows
      const roleChoices = roles.map(({ id, title }) => ({
      name: title,
      value: id,
      }));
    prompt([
      {
        type: 'list',
        name: 'roleId',
        message: 'What role would you like to delete?',
        choices: roleChoices
      }
    ])
    .then(res => db.deleteRole(res.roleId))
    .then(() => console.log('Role deleted from the database'))
    .then(() => init())
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
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
        type: 'list',
        name: 'employeeId',
        message: 'What employee would you like to delete?',
        choices: employeeChoices
      }
    ])
    .then(res => db.deleteEmployee(res.employeeId))
    .then(() => console.log('Employee deleted from the database'))
    .then(() => init())
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
  });
}
 // Exit the application
 function exit() {
  console.log("Goodbye!");
  process.exit(0);
}
