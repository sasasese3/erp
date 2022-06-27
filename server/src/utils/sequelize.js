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

const { PO, PO_Product } = require('../models/po')(sequelize, DataTypes);
db.PO = PO;
db.PO_Product = PO_Product;

//supplier 1 - M product
db.Supplier.hasMany(db.Product, {
    onDelete: 'CASCADE'
});
db.Product.belongsTo(db.Supplier);

//------------------------PO----------------------------------------
//employee 1 - M po
db.Employee.hasMany(db.PO, {
    onDelete: 'CASCADE'
});
db.PO.belongsTo(db.Employee);

//supplier 1 - M po
db.Supplier.hasMany(db.PO, {
    onDelete: 'CASCADE'
});
db.PO.belongsTo(db.Supplier);

//po M - N product
db.PO.belongsToMany(db.Product, { through: db.PO_Product });
db.Product.belongsToMany(db.PO, { through: db.PO_Product });

module.exports = db;