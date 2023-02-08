
SELECT *
FROM department
-- view all departments
-- department names 
-- and department ids

SELECT *
FROM role
-- view all roles
-- job title, 
-- role id, 
-- the department that role belongs to, 
-- and the salary for that role

SELECT *
FROM employee
-- employee ids
-- first names
-- last names
-- job titles
-- departments
-- salaries
-- managers that the employees report to

SELECT *
FROM role
JOIN department ON role.department = department.id;

SELECT *
FROM role
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









-- SELECT favorite_books.book_name AS name, book_prices.price AS price
-- FROM favorite_books
-- JOIN book_prices ON favorite_books.book_price = book_prices


-- SELECT *
-- FROM favorite_books
-- JOIN department ON favorite_books.department = department.id;