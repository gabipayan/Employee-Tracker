const inquirer = require('inquirer');

const mainMenuPrompt = {
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit'
    ]
};

const addDepartmentPrompt = {
    // Create add department prompt object
    type: 'input',
    name: 'departmentName',
    message: 'Enter the name of the department:', // Should ask for department name
    validate: (input) => { // Should validate that department name is not empty
        if (!input) {
            return 'Department name cannot be empty.';
        }
        return true;
    }
};

const addRolePrompts = (departments) => [
    // Create add role prompts array
    {
        type: 'input',
        name: 'roleTitle',
        message: 'Enter the title of the role:', // Should ask for role title
        validate: (input) => { // Should validate that role title is not empty
            if (!input) {
                return 'Role title cannot be empty.';
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the role:', // Should ask for salary
        validate: (input) => { // Should validate that salary is a number greater than 0
            const salary = parseFloat(input);
            if (isNaN(salary) || salary <= 0) {
                return 'Salary must be a number greater than 0.';
            }
            return true;
        }
    },
    {
        type: 'list',
        name: 'departmentId',
        message: 'Select the department for this role:', // Should ask to select department from list
        choices: departments.map(department => ({
            name: department.name,
            value: department.id
        }))
    }
];

const addEmployeePrompts = (roles, employees) => [
    // Create add employee prompts array
    {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the employee:', // Should ask for first name
        validate: (input) => { // Should validate that first name is not empty
            if (!input) {
                return 'First name cannot be empty.';
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the employee:', // Should ask for last name
        validate: (input) => { // Should validate that last name is not empty
            if (!input) {
                return 'Last name cannot be empty.';
            }
            return true;
        }
    },
    {
        type: 'list',
        name: 'roleId',
        message: 'Select the role for this employee:', // Should ask to select role from list
        choices: roles.map(role => ({
            name: role.title,
            value: role.id
        }))
    },
    {
        type: 'list',
        name: 'managerId',
        message: 'Select the manager for this employee:', // Should ask to select manager from list
        choices: [
            ...employees.map(employee => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.id
            })),
            { name: 'None', value: null } // Include option for no manager
        ]
    }
];

const updateEmployeeRolePrompts = (employees, roles) => [
    // Create update employee role prompts array
    // - Should ask to select employee from list
    // - Should ask to select new role from list
    {
        type: 'list',
        name: 'employeeId',
        message: 'Select the employee to update:', // Should ask to select employee from list
        choices: employees.map(employee => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }))
    }
];

module.exports = {
    // Export all prompt objects/arrays
    mainMenuPrompt,
    addDepartmentPrompt,
    addRolePrompts,
    addEmployeePrompts,
    updateEmployeeRolePrompts
}; 