const pool = require('../db/connection');

const employeeQueries = {

    getAllEmployees: async () => {
        // TODO: Implement getAllEmployees
        // - Should return all employees with:
        //   * employee id, first_name, last_name
        //   * role title, department name, salary
        //   * manager name (NULL if no manager)
        // - Should be ordered by id
        const query = `
            SELECT 
                e.id,
                e.first_name,
                e.last_name,
                e.role_id,
                e.manager_id,
                r.title as role_title,
                d.name as department_name,
                r.salary,
                CONCAT(m.first_name, ' ', m.last_name) as manager_name
            FROM employees e
            LEFT JOIN roles r ON e.role_id = r.id
            LEFT JOIN departments d ON r.department_id = d.id
            LEFT JOIN employees m ON e.manager_id = m.id
            ORDER BY e.id
        `;
        const result = await pool.query(query);
        return result.rows;
    },

    addEmployee: async (firstName, lastName, roleId, managerId) => {
        // TODO: Implement addEmployee
        // - Should accept firstName, lastName, roleId, managerId
        // - Should insert new employee
        // - Should return newly created employee
        const query = `
            INSERT INTO employees (first_name, last_name, role_id, manager_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const result = await pool.query(query, [firstName, lastName, roleId, managerId]);
        return result.rows[0];
    },

    updateEmployeeRole: async (employeeId, roleId) => {
        // TODO: Implement updateEmployeeRole
        // - Should accept employeeId and roleId
        // - Should update employee's role
        // - Should return updated employee
        const query = `
            UPDATE employees 
            SET role_id = $2
            WHERE id = $1
            RETURNING *
        `;
        const result = await pool.query(query, [employeeId, roleId]);
        return result.rows[0];
    },

    getEmployeeById: async (id) => {
        // TODO: Implement getEmployeeById
        // - Should accept id parameter
        // - Should return single employee or null
        const result = await pool.query('SELECT * FROM employees WHERE id = $1', [id]);
        return result.rows[0] || null;
        },

    deleteEmployee: async (id) => {
        // TODO: Implement deleteEmployee
        // - Should accept id parameter
        // - Should delete employee if no roles reference it
        // - Should return success/failure status
        const result = await pool.query('DELETE FROM employees WHERE id = $1', [id]);
        return result.rowCount > 0;
    },
};

module.exports = employeeQueries; 