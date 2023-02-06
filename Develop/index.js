  const inquirer= require(inquirer);
  
  const internInfo = [
    {
        type: 'input',
        name: 'Name',
        message: 'What is the intern name?',
        
      },
      {
        type: 'input',
        name: 'idNum',
        message: 'What is the intern ID number?',
        
      },
      {
        type: 'input',
        name: 'email',
        message: 'What is the intern email address?',
      },
      {
        type: 'input',
        name: 'school',
        message: 'Enter the school name.',
      },
     ]
 
 const Menu = [
     {
         type: 'list',
         message: 'What team member role would you like to add?',
         choices: ['Engineer','Intern', 'none'],
         },
     ]
 

// add a department

// prompted to enter the name of the department 
// and that department is added to the database

// add a role

// prompted to enter the name, 
// salary, 
// and department for the role 
// and that role is added to the database

// add an employee

// prompted to enter the employee’s first name, 
// last name, 
// role, 
// and manager, 
// and that employee is added to the database

// update an employee role

// prompted to select an employee to update 
// and their new role 
// and this information is updated in the database
