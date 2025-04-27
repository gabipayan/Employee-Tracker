const inquirer = require('inquirer');
const { mainMenuPrompt, addDepartmentPrompt, addRolePrompts, addEmployeePrompts, updateEmployeeRolePrompts } = require('./src/prompts/inquirer');
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

                case 'Add a department':
                    const { departmentName } = await inquirer.prompt(addDepartmentPrompt);
                    const newDepartment = await departmentQueries.addDepartment(departmentName);
                    display.showSuccess(`Department added: ${newDepartment.name}`);
                    break;

                case 'Add a role':
                    const depts = await departmentQueries.getAllDepartments();
                    if (depts.length === 0) {
                        display.showError('Please add a department first before adding a role.');
                        break;
                    }
                    const roleAnswers = await inquirer.prompt(addRolePrompts(depts));
                    const newRole = await roleQueries.addRole(
                        roleAnswers.title,
                        parseFloat(roleAnswers.salary),
                        roleAnswers.departmentId
                    );
                    display.showSuccess(`Role added: ${newRole.title}`);
                    break;
                    
                case 'Add an employee':
                    // Get roles and employees for the prompts
                    const allRoles = await roleQueries.getAllRoles();
                    const allEmployees = await employeeQueries.getAllEmployees();
                    if (allRoles.length === 0) {
                        display.showError('Please add a role first before adding an employee.');
                        break;
                    }
                    // Pass roles and employees to the prompt
                    const empAnswers = await inquirer.prompt(addEmployeePrompts(allRoles, allEmployees));
                    console.log('Debug - empAnswers:', empAnswers);
                    const newEmployee = await employeeQueries.addEmployee(
                        empAnswers.firstName,
                        empAnswers.lastName,
                        parseInt(empAnswers.roleId),
                        empAnswers.managerId ? parseInt(empAnswers.managerId) : null
                    );
                    display.showSuccess(`Employee added: ${newEmployee.first_name} ${newEmployee.last_name}`);
                    break;
                    
                case 'Update an employee role':
                    const currentEmployees = await employeeQueries.getAllEmployees();
                    const availableRoles = await roleQueries.getAllRoles();
                    if (currentEmployees.length === 0) {
                        display.showError('No employees to update.');
                        break;
                    }
                    const updateAnswers = await inquirer.prompt(updateEmployeeRolePrompts(currentEmployees, availableRoles));
                    const updatedEmployee = await employeeQueries.updateEmployeeRole(
                        updateAnswers.employeeId,
                        updateAnswers.roleId
                    );
                    display.showSuccess(`Employee role updated: ${updatedEmployee.first_name} ${updatedEmployee.last_name}`);
                    break;

                case 'Exit':
                    exit = true;
                    console.log('Goodbye!');
                    process.exit(0);
                    break;
            }
        } catch (error) {
            display.showError(error.message);
        }
    }
}

main(); 