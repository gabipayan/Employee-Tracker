const pool = require('../db/connection');

const departmentQueries = {
    // TODO: Implement getAllDepartments      
    // - Should return all departments ordered by id
    // - Should return: id, name
    getAllDepartments: async () => {
        const result = await pool.query('SELECT * FROM departments ORDER BY id');
        return result.rows;
    },

    // TODO: Implement addDepartment
    // - Should accept name parameter
    // - Should insert new department
    // - Should return the newly created department
    addDepartment: async (name) => {
        const result = await pool.query('INSERT INTO departments (name) VALUES ($1) RETURNING *', [name]);
        return result.rows[0];
    },

    // TODO: Implement getDepartmentById
    // - Should accept id parameter
    // - Should return single department or null
    getDepartmentById: async (id) => {
        const result = await pool.query('SELECT * FROM departments WHERE id = $1', [id]);
        return result.rows[0] || null;
    },

    // BONUS TODO: Implement deleteDepartment
    // - Should accept id parameter
    // - Should delete department if no roles reference it
    // - Should return success/failure status
    deleteDepartment: async (id) => {
        const result = await pool.query('DELETE FROM departments WHERE id = $1', [id]);
        return result.rowCount > 0;
    },
};

module.exports = departmentQueries; 