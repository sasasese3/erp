const { hash } = require('bcrypt');
const userRoles = require('../utils/userRoles');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: DataTypes.STRING(128),
        ssn: DataTypes.STRING(13),
        fullname: DataTypes.STRING(128),
        lastname: DataTypes.STRING(128),
        position: DataTypes.STRING(64),
        department: DataTypes.STRING(64),
        birthdate: DataTypes.DATE,
        address: DataTypes.STRING,
        phone_no: DataTypes.STRING(10),
        role: {
            type: DataTypes.ENUM,
            values: [userRoles.EMPLOYEE, userRoles.INSPECTOR, userRoles.ADMIN],
            defaultValue: userRoles.EMPLOYEE
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    }, { timestamps: false, allowNull: false });

    Employee.beforeCreate(async (employee) => {
        employee.password = await hash(employee.password, saltRounds);
    });
    return Employee;
};