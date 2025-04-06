const pool = require('../db/connection');

const departmentQueries = {
    // Implement getAllDepartments
    getAllDepartments: async () => {
        // Should return all departments ordered by id
        const query = ('SELECT id, name FROM department ORDER BY id');
        const {rows} = await pool.query(query);
        // Should return: id, name
        return rows;
    },

    // Implement addDepartment
    addDepartment: async (name) => {
        // Should accept name parameter
        // Should insert new department
        const query = ('INSERT INTO department (name) VALUES ($1) RETURNING id, name');
        const values = [name];
        const {rows} = await pool.query(query, values);
        // Should return the newly created department
        return rows[0];
    },

    // Implement getDepartmentById
    getDepartmentById: async (id) => {
        // Should accept id parameter
        // Should return single department or null
        const query = ('SELECT * FROM department WHERE id = $1');
        const values = [id];
        const {rows} = await pool.query(query, values);
        // Should return: id, name
        return rows[0] || null;
    },
  
    // Implement deleteDepartment
    deleteDepartment: async (id) => {
        //check if any role is using department
        // Should accept id parameter
        const checkQuery = ('SELECT * FROM role WHERE department_id = $1');
        const checkResult = await pool.query(checkQuery, [id]);
        if (checkResult.rows.length > 0) {
return false; // department is in use
        }
        // Should delete department if no roles reference it
        const deleteQuery = ('DELETE FROM department WHERE id = $1');
        await pool.query(deleteQuery, [id]);
        return true; // department deleted successfully
    // Should return success/failure status
    }
};

module.exports = departmentQueries; 