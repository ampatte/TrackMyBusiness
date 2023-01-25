
/*to hold department name*/
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL 
);

/*to hold role title, role salary, reference to department role belongs to*/
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL NOT NULL,
    FOREIGN KEY (department)
    REFERENCES department(id) INT ON DELETE SET NULL
); 

/*to hold employee first name, employee last name, reference to employee role, reference to another employee that is the manager of the current employee (`null` if the employee has no manager)*/
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) 
    role_id INT
    manager_id INT 
    )