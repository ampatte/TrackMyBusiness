INSERT INTO departments (name)
VALUES  
        ('Executive'),
        ('IT'),
        ('Sales'),
        ('Accounting');

INSERT INTO roles (title, salary, department_id)
VALUES 
        ('CEO', 200000, 1),
        ('CFO', 200000, 1),
        ('Senior Developer', 100000, 2),
        ('Junior Developer', 75000, 2),
        ('Team Lead', 50000, 3),
        ('Sales Rep', 40000, 3),
        ('Customer Service Rep', 35000, 3),
        ('Accountant', 50000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  
        ('John', 'Smith', 1, null),
        ('Hanna', 'Ballard', 2, null),
        ('Andre', 'Young', 4, 4),
        ('Maria', 'Cruz', 3, 1),
        ('Derrik', 'Brown', 5, 1),
        ('Frank', 'Davis', 3, 1),
        ('Caleb', 'Russell', 4, 64),
        ('Morris', 'Parks', 7, 1),
        ('Erica', 'Lee', 7, 8),
        ('Sally', 'Cole', 6, 8),
        ('Mark', 'Hudson', 8, 2);