const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Holdings = sequelize.define('Holdings', {
        coinId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        coinName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        purchasePrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    });
    return Holdings;
}