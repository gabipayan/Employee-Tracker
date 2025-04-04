const inquirer = require('inquirer');
const { 
    getAllDepartments,
    addDepartment,
    getAllRoles,
    addRole,
    getAllEmployees,
    addEmployee,
    updateEmployeeRole
} = require('./db/queries');

const mainMenu = async () => {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: '¿Qué te gustaría hacer?',
            choices: [
                'Ver todos los departamentos',
                'Ver todos los roles',
                'Ver todos los empleados',
                'Agregar un departamento',
                'Agregar un rol',
                'Agregar un empleado',
                'Actualizar el rol de un empleado',
                'Salir'
            ]
        }
    ]);

    switch (action) {
        case 'Ver todos los departamentos':
            await viewDepartments();
            break;
        case 'Ver todos los roles':
            await viewRoles();
            break;
        case 'Ver todos los empleados':
            await viewEmployees();
            break;
        case 'Agregar un departamento':
            await addNewDepartment();
            break;
        case 'Agregar un rol':
            await addNewRole();
            break;
        case 'Agregar un empleado':
            await addNewEmployee();
            break;
        case 'Actualizar el rol de un empleado':
            await updateEmployeeRolePrompt();
            break;
        case 'Salir':
            console.log('¡Hasta luego!');
            process.exit(0);
    }
};

const viewDepartments = async () => {
    const departments = await getAllDepartments();
    console.table(departments);
    mainMenu();
};

const viewRoles = async () => {
    const roles = await getAllRoles();
    console.table(roles);
    mainMenu();
};

const viewEmployees = async () => {
    const employees = await getAllEmployees();
    console.table(employees);
    mainMenu();
};

const addNewDepartment = async () => {
    const { name } = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Ingrese el nombre del departamento:'
        }
    ]);
    await addDepartment(name);
    console.log('Departamento agregado exitosamente!');
    mainMenu();
};

const addNewRole = async () => {
    const departments = await getAllDepartments();
    const { title, salary, department_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Ingrese el título del rol:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Ingrese el salario del rol:'
        },
        {
            type: 'list',
            name: 'department_id',
            message: 'Seleccione el departamento:',
            choices: departments.map(dept => ({
                name: dept.name,
                value: dept.id
            }))
        }
    ]);
    await addRole(title, salary, department_id);
    console.log('Rol agregado exitosamente!');
    mainMenu();
};

const addNewEmployee = async () => {
    const roles = await getAllRoles();
    const employees = await getAllEmployees();
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Ingrese el nombre del empleado:'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Ingrese el apellido del empleado:'
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Seleccione el rol:',
            choices: roles.map(role => ({
                name: role.title,
                value: role.id
            }))
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Seleccione el manager (opcional):',
            choices: [
                { name: 'Ninguno', value: null },
                ...employees.map(emp => ({
                    name: `${emp.first_name} ${emp.last_name}`,
                    value: emp.id
                }))
            ]
        }
    ]);
    await addEmployee(first_name, last_name, role_id, manager_id);
    console.log('Empleado agregado exitosamente!');
    mainMenu();
};

const updateEmployeeRolePrompt = async () => {
    const employees = await getAllEmployees();
    const roles = await getAllRoles();
    const { employee_id, role_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Seleccione el empleado a actualizar:',
            choices: employees.map(emp => ({
                name: `${emp.first_name} ${emp.last_name}`,
                value: emp.id
            }))
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Seleccione el nuevo rol:',
            choices: roles.map(role => ({
                name: role.title,
                value: role.id
            }))
        }
    ]);
    await updateEmployeeRole(employee_id, role_id);
    console.log('Rol de empleado actualizado exitosamente!');
    mainMenu();
};

// Iniciar la aplicación
console.log('Bienvenido al Sistema de Gestión de Empleados');
mainMenu(); 