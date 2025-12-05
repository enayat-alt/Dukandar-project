const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');

const Order = sequelize.define('Order', {
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  totalPrice: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'pending' },
});

Order.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Order;
