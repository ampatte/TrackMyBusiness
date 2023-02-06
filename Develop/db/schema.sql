DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

/*to hold department name*/
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL

);

/*to hold role title, role salary, reference to department role belongs to*/
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id) 
); 

/*to hold employee first name, employee last name, reference to employee role, reference to another employee that is the manager of the current employee (`null` if the employee has no manager)*/
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role(id) 
);
    
-- ALTER TABLE employee(    
--     ADD CONSTRAINT FK_manager_id
--     FOREIGN KEY (manager_id) REFERENCES employee(id)
-- );