const pool = require('../db/connection');

const roleQueries = {
    getAllRoles: async () => {
        const query = `
            SELECT 
                r.id, 
                r.title, 
                r.salary, 
                r.department_id,
                d.name as department_name
            FROM roles r
            JOIN departments d ON r.department_id = d.id
            ORDER BY r.id
        `;
        const result = await pool.query(query);
        return result.rows;
    },

    addRole: async (title, salary, departmentId) => {
        const query = `
            INSERT INTO roles (title, salary, department_id)
            VALUES ($1, $2, $3)
            RETURNING *
        `;
        const result = await pool.query(query, [title, salary, departmentId]);
        return result.rows[0];
    }
};

module.exports = roleQueries;