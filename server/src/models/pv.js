module.exports = (sequelize, DataTypes) => {
    const PV = sequelize.define('PV', {
        pv_id: {
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
        },
        id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        customerName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        detail: DataTypes.STRING,
    }, {
        timestamps: true,
    });

    const PV_Product = sequelize.define('PV_Product', {
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
    return { PV, PV_Product };
};