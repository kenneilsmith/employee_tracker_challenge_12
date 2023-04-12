const express = require('express')
const inquirer = require('inquirer')
require('console.table')
const db = require('./db/db_connect')

const PORT = process.env.PORT || 3000
const app = express()

// Express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


function viewEmployees() {
    db.query(`SELECT * FROM employees`, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table(rows)
        menuQuestions()
    })

}

function viewRoles() {
    db.query(`SELECT * FROM roles`, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table(rows)
        menuQuestions()
    })
}

function viewDepartments() {
    db.query(`SELECT * FROM departments`, (err, rows) => {
        if (err) {
            console.log(err)
        }
        console.table(rows)
        menuQuestions()
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employee\'s first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employee\'s last name?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the employee\'s role id?'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the employee\'s manager id?'
        }

    ]).then((answer) => {
        const { first_name, last_name, role_id, manager_id } = answer
        db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [first_name, last_name, role_id, manager_id], (err, rows) => {
            if (err) {
                console.log(err)
            }
            console.table(rows)
            console.log(answer.first_name + ' ' + answer.last_name + ' has been added to the database')
            menuQuestions()

        })
    })
}

function addRoles() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the role\'s title?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the role\'s salary?'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the role\'s department id?'
        }
    ]).then((answer) => {
        const { title, salary, department_id } = answer

        db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [title, salary, department_id], (err, rows) => {
            if (err) {
                console.log(err)
            }
            console.table(rows)
            console.log(answer.title + ' has been added to the database')
            menuQuestions()
        })
    })

}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'dept_name',
            message: 'What is the department\'s name?'
        }
    ]).then((answer) => {
        const { dept_name } = answer

        db.query(`INSERT INTO departments(dept_name) VALUES (?)`, [dept_name], (err, rows) => {
            console.table(rows)
            console.log(answer.dept_name + ' has been added to the database')
            menuQuestions()
        })
    })

}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the employee\'s id?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the employee\'s new role id?'
        }
    ]).then((answer) => {
        const { id, role_id } = answer

        db.query(`UPDATE employees SET role_id = ? WHERE id = ?`, [role_id, id], (err, rows) => {
            if (err) {
                console.log(err)
            }
            console.table(rows)
            console.log('Employee role has been updated')
            menuQuestions()
        })
    })
}

function updateEmployeeManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the employee\'s id?'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the employee\'s new manager id?'
        }
    ]).then((answer) => {
        const { id, manager_id } = answer

        db.query(`UPDATE employees SET manager_id = ? WHERE id = ?`, [manager_id, id], (err, rows) => {
            if (err) {
                console.log(err)
            }
            console.table(rows)
            console.log('Employee manager has been updated')
            menuQuestions()
        })

    })
}

function deleteEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the employee\'s id?'
        }
    ]).then((answer) => {
        const { id } = answer
        db.query(`DELETE FROM employees WHERE id = ?`, [id], (err, rows) => {
            if (err) {
                console.log(err)
            }
            console.table(rows)
            console.log('Employee has been deleted')
            menuQuestions()
        })
    })
}

function deleteRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the role\'s id?'
        }
    ]).then((answer) => {
        const { id } = answer
        db.query(`DELETE FROM roles WHERE id = ?`, [id], (err, rows) => {
            if (err) {
                console.log(err)
            }
            console.table(rows)
            console.log('Role has been deleted')
            menuQuestions()
        })
    })
}

function deleteDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the department\'s id?'
        }
    ]).then((answer) => {
        const { id } = answer

        db.query(`DELETE FROM department WHERE id = ?`, [id], (err, rows) => {
            if (err) {
                console.log(err)
            }
            console.table(rows)
            console.log('Department has been deleted')
            menuQuestions()
        })
    })
}

function viewEmployeesByManager() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the manager\'s id?'
        }
    ]).then((answer) => {
        const { manager_id } = answer

        db.query(`SELECT * FROM employees WHERE manager_id = ?`, [manager_id], (err, rows) => {
            if (err) {
                console.log(err)
            }
            console.table(rows)
            menuQuestions()
        })
    })
}

function viewEmployeesByDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department\'s id?'
        }
    ]).then((answer) => {
        const { department_id } = answer

        db.query(`SELECT CONCAT(e.first_name, ' ', e.last_name) AS name, r.title, d.dept_name FROM employees e JOIN roles r ON e.role_id = r.id JOIN departments d ON r.department_id = d.id WHERE d.id =  ?`, [department_id], (err, rows) => {
            if (err) {
                console.log(err)
            }
            console.table(rows)
            menuQuestions()
        })
    })
}

function viewDepartmentBudget() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department\'s id?'
        }
    ]).then((answer) => {
        const { department_id } = answer
        db.query(`SELECT d.dept_name, SUM(r.salary)as budget FROM departments d JOIN roles r ON d.id = r.department_id WHERE d.id = ?`, [department_id], (err, rows) => {
            if (err) {
                console.log(err)
            }
            console.table(rows)
            menuQuestions()
        })
    })
}

function menuQuestions() {
    return inquirer.prompt(
        [
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all employees',
                    'View all roles',
                    'View all departments',
                    'Add employee',
                    'Add role',
                    'Add department',
                    'Update employee role',
                    'Update employee manager',
                    'Delete employee',
                    'Delete role',
                    'Delete department',
                    'View employees by manager',
                    'View employees by department',
                    'View total utilized budget of a department',
                    'Exit'
                ]
            }
        ]).then((answer) => {
            switch (answer.action) {
                case 'View all employees':
                    viewEmployees()
                    break
                case 'View all roles':
                    viewRoles()
                    break
                case 'View all departments':
                    viewDepartments()
                    break
                case 'Add employee':
                    addEmployee()
                    break
                case 'Add role':
                    addRoles()
                    break
                case 'Add department':
                    addDepartment()
                    break
                case 'Update employee role':
                    updateEmployeeRole()
                    break
                case 'Update employee manager':
                    updateEmployeeManager()
                    break
                case 'Delete employee':
                    deleteEmployee()
                    break
                case 'Delete role':
                    deleteRole()
                    break
                case 'Delete department':
                    deleteDepartment()
                    break
                case 'View employees by manager':
                    viewEmployeesByManager()
                    break
                case 'View employees by department':
                    viewEmployeesByDepartment()
                    break
                case 'View total utilized budget of a department':
                    viewDepartmentBudget()
                    break
                case 'Exit':
                    process.exit()

            }
        })

}



menuQuestions()










app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
