const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }
    findAllEmployees() {
        return this.connection.promise().query(
        SELECT employees.id, employee.first_name,
    );
}
}

createEmployee(employee) {
    return this connection.promise().query("INSERT INTO employee SET ?", employee);
}

removeEmployee(employeeId) {
    return this.connection.promise().query(
        "DELETE FROM employee WHERE id = ?", employee
    )
}

updateEmployee