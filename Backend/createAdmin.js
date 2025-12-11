const bcrypt = require('bcryptjs');
const User = require('./models/User');

const createAdmin = async () => {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@dukandar.com',
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Admin user created:', admin.email);
    process.exit();
  } catch (err) {
    console.error('Error creating admin:', err.message);
    process.exit(1);
  }
};

createAdmin();
