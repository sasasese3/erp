module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, {
        timestamps: false,
    });
    return Product;
};