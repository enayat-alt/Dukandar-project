const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define("Order", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  items: {
    type: DataTypes.TEXT, // store cart items as JSON
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
    defaultValue: "pending", // pending or paid
  },
  paymentId: {
    type: DataTypes.STRING, // Stripe PaymentIntent ID
    allowNull: true,
  },
  paymentStatus: {
    type: DataTypes.STRING, // "succeeded", "failed", etc.
    allowNull: true,
  },
});

module.exports = Order;

