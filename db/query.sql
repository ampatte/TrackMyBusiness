
SELECT *
FROM departments
-- view all departments
-- department names 
-- and department ids

SELECT *
FROM roles
-- view all roles
-- job title, 
-- role id, 
-- the department that role belongs to, 
-- and the salary for that role

SELECT *
FROM employees
-- employee ids
-- first names
-- last names
-- job titles
-- departments
-- salaries
-- managers that the employees report to

SELECT *
FROM roles
JOIN department ON role.department = department.id;

SELECT *
FROM roles
GROUP BY salary;

-- view all employees
-- formatted table showing employee data,
-- including employee ids, 
-- first names, 
-- last names, 
-- job titles, 
-- departments, 
-- salaries, 
-- and managers that the employees report to

SELECT * 
FROM employee
JOIN department ON employee.department = department.id;