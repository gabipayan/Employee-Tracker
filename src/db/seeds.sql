-- Insert departments
INSERT INTO department (name) VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('Sales');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
    ('Lead Engineer', 150000, 1),
    ('Software Engineer', 120000, 1),
    ('Account Manager', 160000, 2),
    ('Accountant', 125000, 2),
    ('Legal Team Lead', 250000, 3),
    ('Lawyer', 190000, 3),
    ('Sales Lead', 100000, 4),
    ('Salesperson', 80000, 4);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
-- Implement employee seed data
-- insert multiple employees with:
  ('Carla', 'Gonzalez', 1, 5),
  ('Luis', 'Martinez', 2, 1),
  ('Ana', 'Lopez', 3, 1),
  ('Javier', 'Fernandez', 4, 3),
  ('Sofia', 'Garcia', 5, 4),
  ('Diego', 'Hernandez', 6, 5),
  ('Laura', 'Torres', 7, 3),
  ('Pablo', 'Ramirez', 8, 7);
--   * first_name, last_name, role_id, manager_id
--   * role_id should reference a role in the role table