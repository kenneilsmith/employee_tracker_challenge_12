const express = require('express')
// const mysql = require('mysql2')
const inquirer = require('inquirer')
const cTable = require('console.table')
const db = require('./db/db_connect')

const PORT = process.env.PORT || 3001
const app = express()


// Express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


function init() {
    inquirer.prompt(
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
        ])

        .then((answer) => {
            switch (answer.action) {
                case 'View all employees':
                    db.query(`SELECT * FROM employees`, (err, rows) => {
                        const table = cTable.getTable(rows)
                        return console.log(table)
                    })
                    break
                case 'View all roles':
                    db.query(`SELECT * FROM roles`, (err, rows) => {
                        const table = cTable.getTable(rows)
                        return console.log(table)
                    })
                    break
                case 'View all departments':
                    db.query(`SELECT * FROM departments`, (err, rows) => {
                        const table = cTable.getTable(rows)
                        return console.log(table)
                    })
                    break
                case 'Add employee':
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
                            const table = cTable.getTable(rows)
                            return console.log(table)

                        })
                    })
                    break
                case 'Add role':
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
                            const table = cTable.getTable(rows)
                            return console.log(table)
                        })
                    })
                    break
                case 'Add department':
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'name',
                            message: 'What is the department\'s name?'
                        }
                    ]).then((answer) => {
                        const { name } = answer

                        db.query(`INSERT INTO departments (name) VALUES (?)`, [name], (err, rows) => {
                            const table = cTable.getTable(rows)
                            return console.log(table)
                        })
                    })
                    break
                case 'Update employee role':
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

                        db.query(`UPDATE employees SET role_id = ? WHERE id = ?`, [id, role_id], (err, rows) => {
                            const table = cTable.getTable(rows)
                            return console.log(table)
                        })
                    })
                    break
                case 'Update employee manager':
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

                        db.query(`UPDATE employees SET manager_id = ? WHERE id = ?`, [id, manager_id], (err, rows) => {
                            const table = cTable.getTable(rows)
                            return console.log(table)
                        })
                    })
                    break
                case 'Delete employee':
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'id',
                            message: 'What is the employee\'s id?'
                        }
                    ]).then((answer) => {
                        const { id } = answer
                        db.query(`DELETE FROM employees WHERE id = ?`, [id], (err, rows) => {
                            const table = cTable.getTable(rows)
                            return console.log(table)
                        })
                    })

                    break
                case 'Delete role':
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'id',
                            message: 'What is the role\'s id?'
                        }
                    ]).then((answer) => {
                        const { id } = answer
                        db.query(`DELETE FROM roles WHERE id = ?`, [id], (err, rows) => {
                            const table = cTable.getTable(rows)
                            return console.log(table)
                        })
                    })
                    break
                case 'Delete department':
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'id',
                            message: 'What is the department\'s id?'
                        }
                    ]).then((answer) => {
                        const { id } = answer

                        db.query(`DELETE FROM departments WHERE id = ?`, [id], (err, rows) => {
                            const table = cTable.getTable(rows)
                            return console.log(table)
                        })
                    })
                    break
                case 'View employees by manager':
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'manager_id',
                            message: 'What is the manager\'s id?'
                        }
                    ]).then((answer) => {
                        const { manager_id } = answer

                        db.query(`SELECT * FROM employees WHERE manager_id = ?`, [manager_id], (err, rows) => {
                            const table = cTable.getTable(rows)
                            return console.log(table)
                        })
                    })
                    break
                case 'View employees by department':
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'department_id',
                            message: 'What is the department\'s id?'
                        }
                    ]).then((answer) => {
                        const { department_id } = answer

                        db.query(`SELECT * FROM employees WHERE department_id = ?`, [department_id], (err, rows) => {
                            const table = cTable.getTable(rows)
                            return console.log(table)
                        })
                    })
                    break
                case 'View total utilized budget of a department':
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'department_id',
                            message: 'What is the department\'s id?'
                        }
                    ]).then((answer) => {
                        const { department_id } = answer
                        db.query(`SELECT SUM(salary) FROM employees WHERE department_id = ?`, [department_id], (err, rows) => {
                            const table = cTable.getTable(rows)
                            console.log(table)
                            return console.log(table)
                        })
                    })
                    break
                case 'Exit':
                    process.exit()

            }
        })
}

init()



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
