const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.DB_USER, process.env.MYSQL_ROOT_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
});

const db = {};
db.sequelize = sequelize;
db.DataTypes = DataTypes;

db.Employee = require('../models/employee')(sequelize, DataTypes);
db.Supplier = require('../models/supplier')(sequelize, DataTypes);
db.Product = require('../models/product')(sequelize, DataTypes);

db.Supplier.hasMany(db.Product);
db.Product.belongsTo(db.Supplier);
module.exports = db;