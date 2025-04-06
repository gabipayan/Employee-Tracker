const console = require('console');
const { table } = require('console');

const display = {
    showTable: (data) => {
        if (data.length === 0) {
            console.log('No data to display');
            return;
        }
        console.table(data);
    },

    showSuccess: (message) => {
        console.log('\x1b[32m%s\x1b[0m', `✓ Success: ${message}`);
    },

    showError: (message) => {
        console.log('\x1b[31m%s\x1b[0m', `✗ Error: ${message}`);
    }
};

module.exports = display; 