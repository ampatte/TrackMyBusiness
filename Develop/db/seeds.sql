INSERT INTO department (name)
VALUES  ('Executive'),
        ('Human Resources'),
        ('Sales'),
        ('Customer Service');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Manager', 50000.00, 1),
        ('Accountant', 45000.00, 2),
        ('Sales Rep', 40000.00, 3),
        ('Customer Service Rep', 30000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Smith', 1, 1),
        ('Andre', 'Young', 3, 1),
        ('Maria', 'Cruz', 2, 1),
        ('Derrik', 'Brown', 3, 1),
        ('Frank', 'Davis', 4, 3),
        ('Caleb', 'Russell', 4, 3),
        ('Morris', 'Parks', 2, 8),
        ('Erica', 'Lee', 1, 1);