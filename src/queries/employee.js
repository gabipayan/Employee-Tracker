const pool = require('../db/connection');

const employeeQueries = {

    getAllEmployees: async () => {
        // Implement getAllEmployees
        // Should return all employees with:
        //   * employee id, first_name, last_name
        //   * role title, department name, salary
        //   * manager name (NULL if no manager)
        // * Should be ordered by id
        const query = `
        SELECT e.id, e.first_name, e.last_name, 
        r.title AS role_title, 
        d.name AS department_name, 
        r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
        FROM employee e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
            ORDER BY e.id;
        `;
        const { rows } = await pool.query(query);
        return rows;
    },

    addEmployee: async (firstName, lastName, roleId, managerId) => {
        // Implement addEmployee
        // Should accept firstName, lastName, roleId, managerId
        // Should insert new employee
        // Should return newly created employee
        const query = `
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `;
        const values = [firstName, lastName, roleId, managerId];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    updateEmployeeRole: async (employeeId, roleId) => {
        // Implement updateEmployeeRole
        // should accept employeeId and roleId
        // Should update employee's role
        // Should return updated employee
        const query = `
        UPDATE employee
        SET role_id = $1
        WHERE id = $2
        RETURNING *;
        `;
        const values = [roleId, employeeId];
        const { rows } = await pool.query(query, values);
        return rows[0];
    },

    getEmployeeById: async (id) => {
        // Implement getEmployeeById
        // Should accept id parameter
        // Should return single employee or null
        const query = `SELECT * FROM employee WHERE id = $1`;
        const { rows } = await pool.query(query, [id]);
        return rows[0] || null;
    },
};

module.exports = employeeQueries; 