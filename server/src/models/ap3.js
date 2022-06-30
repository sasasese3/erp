module.exports = (sequelize, DataTypes) => {
    const AP3 = sequelize.define('AP3', {
        ap3_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        tax: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        priceWithTax: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true,
    });

    return AP3;
};