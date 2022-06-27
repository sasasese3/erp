module.exports = (sequelize, DataTypes) => {
    const PO = sequelize.define('PO', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total_price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM,
            values: ['pending', 'rejected', 'approved'],
            defaultValue: 'pending'
        },
        file_path: DataTypes.STRING,
        createdAt: {
            type: "TIMESTAMP",
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
            allowNull: false,
        }
    }, {
        timestamps: true,
        updatedAt: false,
    });

    const PO_Product = sequelize.define('PO_Product', {
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        no: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
    return { PO, PO_Product };
};