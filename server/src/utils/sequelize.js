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

//supplier 1 - M product
db.Supplier.hasMany(db.Product, {
    onDelete: 'CASCADE'
});
db.Product.belongsTo(db.Supplier);

//! PO Relation
const { PO, PO_Product } = require('../models/po')(sequelize, DataTypes);
db.PO = PO;
db.PO_Product = PO_Product;

//* employee 1 - M po
db.Employee.hasMany(db.PO, {
    onDelete: 'CASCADE'
});

db.PO.belongsTo(db.Employee);
db.PO.belongsTo(db.Employee, {
    as: 'inspector',
    foreignKey: 'inspectorId'
});

//* supplier 1 - M po
db.Supplier.hasMany(db.PO, {
    onDelete: 'CASCADE'
});
db.PO.belongsTo(db.Supplier);

//* po M - N product
db.PO.belongsToMany(db.Product, { through: db.PO_Product });
db.Product.belongsToMany(db.PO, { through: db.PO_Product });

//! RV Relation 
const { RV, RV_Product } = require('../models/rv')(sequelize, DataTypes);
db.RV = RV;
db.RV_Product = RV_Product;

//* employee 1 - M po
db.Employee.hasMany(db.RV, {
    onDelete: 'CASCADE'
});

db.RV.belongsTo(db.Employee);
db.RV.belongsTo(db.Employee, {
    as: 'inspector',
    foreignKey: 'inspectorId'
});

//* supplier 1 - M RV
db.Supplier.hasMany(db.RV, {
    onDelete: 'CASCADE'
});
db.RV.belongsTo(db.Supplier);

//* RV M - N product
db.RV.belongsToMany(db.Product, { through: db.RV_Product });
db.Product.belongsToMany(db.RV, { through: db.RV_Product });

//TODO PV
//TODO AP3
//TODO IB

module.exports = db;