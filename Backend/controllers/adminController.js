

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

// ------------------ Admin Register ------------------
exports.adminRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = await User.create({
      name,
      email,
      password: hashed,
      role: "admin"  // Ensure role is admin
    });

    res.json({ message: "Admin created", admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ------------------ Admin Login ------------------
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user with role admin
    const admin = await User.findOne({ where: { email, role: "admin" } });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    // Compare password
    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    // Create JWT including role
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: "admin" }, // <-- ADD role here
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Admin logged in", token, admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
