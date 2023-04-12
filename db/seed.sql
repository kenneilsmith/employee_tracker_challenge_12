-- INSERT INTO departments(dept_name)
-- VALUES('Sales'),
--     ('Engineering'),
--     ('Finance'),
--     ('Legal');

-- INSERT INTO roles(title, salary, department_id)
-- VALUES('Sales Lead', 100000, 1),
--     ('Salesperson', 80000, 1),
--     ('Lead Engineer', 150000, 2),
--     ('Software Engineer', 120000, 2),
--     ('Accountant', 125000, 3),
--     ('Legal Team Lead', 200000, 4),
--     ('Lawyer', 180000, 4);

-- INSERT INTO employees(first_name, last_name, department_id, role_id, manager_id)
-- VALUES('John', 'Doe', 1, 1, 1),
--     ('Jane', 'Doe', 1, 2, 1),
--     ('John', 'Smith', 2, 3, 2),
--     ('Jane', 'Smith', 2, 4, 2);
  
INSERT INTO departments(dept_name)
VALUES('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');
INSERT INTO roles(id, title, salary, department_id)
VALUES (1, 'Sales Lead', 100000, 1),
    (2, 'Salesperson', 80000, 1),
    (3, 'Lead Engineer', 150000, 2),
    (4, 'Software Engineer', 120000, 2),
    (5, 'Accountant', 125000, 3),
    (6, 'Legal Team Lead', 200000, 4),
    (7, 'Lawyer', 180000, 4);

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, null),
    ('Jane', 'Doe', 2, 1),
    ('John', 'Smith', 3, null),
    ('Jane', 'Smith', 4, 3),
    ('Jim', 'Doe', 5, null),
    ('Jannett', 'Doe', 6, null),
    ('James', 'Smith', 7, 6);