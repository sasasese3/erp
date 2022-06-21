const { hash } = require('bcrypt');
const userRoles = require('../utils/userRoles');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        id: {
            type: DataTypes.STRING(64),
            primaryKey: true,
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
        username: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        ssn: {
            type: DataTypes.STRING(13),
            allowNull: false,
            unique: true
        },
        firstname: DataTypes.STRING(128),
        lastname: DataTypes.STRING(128),
        position: DataTypes.STRING(64),
        department: DataTypes.STRING(64),
        birthdate: DataTypes.DATE,
        address: DataTypes.STRING,
        phone_no: DataTypes.STRING(10),
        role: {
            type: DataTypes.ENUM,
            values: userRoles.ALL,
            defaultValue: userRoles.EMPLOYEE[0]
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    }, {
        timestamps: false,
    });

    Employee.beforeCreate(async (employee) => {
        employee.password = await hash(employee.password, saltRounds);
    });
    return Employee;
};