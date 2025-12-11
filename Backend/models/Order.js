


const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define("Order", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  items: {
    type: DataTypes.TEXT, // TEXT ensures compatibility
    allowNull: false,
    get() {
      const raw = this.getDataValue("items");
      return raw ? JSON.parse(raw) : [];
    },
    set(value) {
      this.setDataValue("items", JSON.stringify(value));
    },
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
});

module.exports = Order;
