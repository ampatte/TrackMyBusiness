  const inquirer= require(inquirer);
  
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
                'Update an employee role'],
   },  
  ]
  //const view_all_dept = [SELECT * FROM department]
  //const view_all_role = [SELECT * FROM role]
  //const view_all_employee = [SELECT * FROM employee]
  
// prompted to enter a new name of dept then add to db
const add_dept = [
    {
      type: 'input',
      name: 'department',
      message: 'What department would you like to add?',
    }
  ]
  
// prompted to enter new role name, salary, dept, then add to db
  const add_role = [
    {
      type: 'input',
      name: 'role',
      message: 'What is the new role name?',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the salary for this role?',
    },
    {
      type: 'input',
      name: 'department',
      message: 'In what department does this role belong?',
    }
  ]
  //prompted to enter first name, last name, role, manager, then add to db
  const add_employee = [
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
      message: 'What is the employee role?'
    },
    {
      type: 'input',
      name: 'manager',
      message: 'Who is the employee manager?',
      //choices: manager_first_name,
    }
  ]
  const update_employee_role = [
    {
      type: 'list',
      name: 'employee',
      message: 'What employee would you like to update?',
      //choices: view_all_employee[]
    },
    {
      type: 'list',
      name: 'role',
      message: 'What is the employee updated role?',
    }
  ]
  // Update employee to manager
  const update_employee_manager = [
    {
      type: 'list',
      name: 'employee',
      message: 'What employee would you like to update?',
      //choices: view_all_employee[]
    },
    {
      type: 'list',
      name: 'role',
      message: 'Who is the employee updated manager?',
    }
  ]
    

    // View employees by manager.
    
    // View employees by department.
    
    // Delete departments, roles, and employees.
    
    // View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
  