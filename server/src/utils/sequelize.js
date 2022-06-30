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
db.RV.belongsToMany(db.Product, { through: db.RV_Product, foreignKey: 'rvId' });
db.Product.belongsToMany(db.RV, { through: db.RV_Product });

//! PV Relation 
const { PV, PV_Product } = require('../models/pv')(sequelize, DataTypes);
db.PV = PV;
db.PV_Product = PV_Product;

//* employee 1 - M po
db.Employee.hasMany(db.PV, {
    onDelete: 'CASCADE'
});

db.PV.belongsTo(db.Employee);
db.PV.belongsTo(db.Employee, {
    as: 'inspector',
    foreignKey: 'inspectorId'
});

//* supplier 1 - M PV
db.Supplier.hasMany(db.PV, {
    onDelete: 'CASCADE'
});
db.PV.belongsTo(db.Supplier);

//* PV M - N product
db.PV.belongsToMany(db.Product, { through: db.PV_Product, foreignKey: 'pvId' });
db.Product.belongsToMany(db.PV, { through: db.PV_Product });

//TODO ap3
db.AP3 = require('../models/ap3')(sequelize, DataTypes);

//* employee 1 - M po
db.Employee.hasMany(db.AP3, {
    onDelete: 'CASCADE'
});

db.AP3.belongsTo(db.Employee);
db.AP3.belongsTo(db.Employee, {
    as: 'inspector',
    foreignKey: 'inspectorId'
});

//TODO IB

module.exports = db;