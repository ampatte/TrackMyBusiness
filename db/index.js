const connection = require('../config/connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    findAllDepartments() {
        return this.connection.promise().query(
        "SELECT departments.id, departments.name, departments.name AS department");
    }
    //create new department
    addDepartment(departments) {
        return this.connection.promise().query("INSERT INTO departments SET ?", departments);
    }

    findAllRoles() {
        return this.connection.promise().query(
        "SELECT roles.id, roles.title, roles.salary AS role LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id");
    }
    //create new role
    addRole(roles) {
        return this.connection.promise().query("INSERT INTO roles SET ?", roles);
    }

    findAllEmployees() {
        return this.connection.promise().query(
        "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name,'', manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON departments.id = roles.department_id LEFT JOIN employees manager ON manager.id = employees.manager_id");
    }
    //create new employee
    addEmployee(employees) {
        return this.connection.promise().query("INSERT INTO employees SET ?", employees);
    }

    //Update the given employee's role
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
        "UPDATE employees SET role_id = ? WHERE id = ?",
        [roleId, employeeId]
        );
    } 
    //Update the given employee's manager
    updateEmployeeManager(employeeId, managerId) {
        return this.connection.promise().query(
        "UPDATE employees SET manager_id = ? WHERE id = ?",
        [managerId, employeeId]
        );
    }
    findAllEmployeesByManager(employeeId, managerId) {
        return this.connection.promise().query(
        "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name,'', manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id"
        [employeeId, managerId]
        );
    }

    findAllEmployeesByDepartment(employeeId, departmentId) {
        return this.connection.promise().query(
        "SELECT departments.id, departments.name, roles.salary AS budget FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON departments.id = roles.department_id GROUP BY departments.id, department.name"
        [employeeId, departmentId]
        );
    }

  
    deleteDepartment(departmentId) {
        return this.connection.promise().query(
            "DELETE FROM departments WHERE id = ?", departmentId);
    }

    deleteRole(roleId) {
        return this.connection.promise().query(
            "DELETE FROM roles WHERE id = ?", roleId);
    }

    deleteEmployee(employeeId) {
        return this.connection.promise().query(
            "DELETE FROM employees WHERE id = ?", employeeId);
    }
}

module.exports = new DB(connection)