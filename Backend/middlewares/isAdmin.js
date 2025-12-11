const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAdmin = (req, res, next) => {
  // Get token from headers
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check role
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Not authorized as admin" });
    }

    // Attach user info to request
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = isAdmin;
