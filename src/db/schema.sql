-- TODO: Create a database named employee_tracker if it doesn't exist
DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;

-- TODO: Drop existing tables in correct order (consider foreign key constraints)
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

-- TODO: Create department table with:
--   - id (SERIAL PRIMARY KEY)
--   - name (VARCHAR(30), UNIQUE, NOT NULL)
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

-- TODO: Create role table with:
--   - id (SERIAL PRIMARY KEY)
--   - title (VARCHAR(30), UNIQUE, NOT NULL)
--   - salary (DECIMAL, NOT NULL)
--   - department_id (INTEGER, NOT NULL, FOREIGN KEY)
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL REFERENCES departments(id)
);  

-- TODO: Create employee table with:
--   - id (SERIAL PRIMARY KEY)
--   - first_name (VARCHAR(30), NOT NULL)
--   - last_name (VARCHAR(30), NOT NULL)
--   - role_id (INTEGER, NOT NULL, FOREIGN KEY)
--   - manager_id (INTEGER, FOREIGN KEY, can be NULL)
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL REFERENCES roles(id),
    manager_id INTEGER REFERENCES employees(id)
);