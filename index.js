const inquirer = require('inquirer');
const { mainMenuPrompt } = require('./src/prompts/inquirer');
const departmentQueries = require('./src/queries/department');
const roleQueries = require('./src/queries/role');
const employeeQueries = require('./src/queries/employee');
const display = require('./src/utils/display');

async function main() {
    let exit = false;

    while (!exit) {
        try {
            const { action } = await inquirer.prompt(mainMenuPrompt);

            switch (action) {
                case 'View all departments':
                    const departments = await departmentQueries.getAllDepartments();
                    display.showTable(departments);
                    break;

                case 'View all roles':
                    const roles = await roleQueries.getAllRoles();
                    display.showTable(roles);
                    break;

                case 'View all employees':
                    const employees = await employeeQueries.getAllEmployees();
                    display.showTable(employees);
                    break;

                case 'Exit':
                    exit = true;
                    console.log('Goodbye!');
                    process.exit(0);
                    break;

                // Add other cases here...
            }
        } catch (error) {
            display.showError(error.message);
        }
    }
}

main(); 