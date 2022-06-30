module.exports = (sequelize, DataTypes) => {
    const IB = sequelize.define('IB', {
        ib_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        total_price: {
            type: DataTypes.FLOAT,
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
        companyName: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        timestamps: true,
    });

    const IB_Product = sequelize.define('IB_Product', {
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        no: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    }, {
        timestamps: false,
    });
    return { IB, IB_Product };
};