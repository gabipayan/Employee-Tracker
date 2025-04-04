DROP DATABASE IF EXISTS EmployeeTracker_db;
CREATE DATABASE Employee Tracker_db;

\c EmployeeTracker_db;

-- Crear tabla department
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- Crear tabla role
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department INTEGER NOT NULL,
    CONSTRAINT fk_department
        FOREIGN KEY(department)
        REFERENCES department(id)
        ON DELETE CASCADE
);

-- Crear tabla employee
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    CONSTRAINT fk_role
        FOREIGN KEY(role_id)
        REFERENCES role(id)
        ON DELETE SET NULL,
    CONSTRAINT fk_manager
        FOREIGN KEY(manager_id)
        REFERENCES employee(id)
        ON DELETE SET NULL
);