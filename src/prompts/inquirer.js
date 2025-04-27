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
    // TODO: Create add department prompt object
    // - Should ask for department name
    // - Should validate that department name is not empty
    type: 'input',
    name: 'departmentName',
    message: 'Enter the name of the department:',
    validate: (input) => {
        if (input.trim() === '') {
            return 'Department name cannot be empty';
        }
        return true;
    }
};

const addRolePrompts = (departments) => [
    {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role:',
        validate: (input) => {
            if (input.trim() === '') {
                return 'Role title cannot be empty';
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary of the role:',
        validate: (input) => {
            const salary = parseFloat(input);
            if (isNaN(salary) || salary <= 0) {
                return 'Salary must be a number greater than 0';
            }
            return true;
        }
    },
    {
        type: 'list',
        name: 'departmentId',
        message: 'Select the department for the role:',
        choices: departments.map(d => ({
            name: d.name,
            value: d.id
        }))
    }
];

const addEmployeePrompts = (roles, employees) => [
    {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the employee:',
        validate: input => input.trim() ? true : 'First name cannot be empty'
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the employee:',
        validate: input => input.trim() ? true : 'Last name cannot be empty'
    },
    {
        type: 'list',
        name: 'roleId',
        message: 'Select the role for the employee:',
        choices: roles.map(r => ({
            name: r.title,
            value: r.id
        }))
    },
    {
        type: 'list',
        name: 'managerId',
        message: 'Select the manager for the employee:',
        choices: [
            { name: 'None', value: null },
            ...employees.map(e => ({
                name: `${e.first_name} ${e.last_name}`,
                value: e.id
            }))
        ]
    }
];

const updateEmployeeRolePrompts = (employees, roles) => [
    {
        type: 'list',
        name: 'employeeId',
        message: 'Select the employee to update:',
        choices: employees.map(e => ({
            name: `${e.first_name} ${e.last_name}`,
            value: e.id
        }))
    },
    {
        type: 'list',
        name: 'roleId',
        message: 'Select the new role for the employee:',
        choices: roles.map(r => ({
            name: r.title,
            value: r.id
        }))
    }
];

module.exports = {
    // TODO: Export all prompt objects/arrays
    mainMenuPrompt,
    addDepartmentPrompt,
    addRolePrompts,
    addEmployeePrompts,
    updateEmployeeRolePrompts
}; 