const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.sync({ alter: true }); // wait for DB sync
    console.log('Database synced');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('DB sync error:', err);
    process.exit(1); // exit only if DB fails
  }
};

startServer();
