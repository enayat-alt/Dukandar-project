
const express = require('express');
const fs = require('fs');
const path = require('path');
const {
  createProduct,
  getProducts,
  getProductById, // import the new controller
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

const multer = require('multer');
const router = express.Router();

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // save images in uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // unique filename
  },
});
const upload = multer({ storage });

// ------------------- Public Routes -------------------
// Get all products
router.get('/', getProducts);

// Get single product by ID
router.get('/:id', getProductById);

// ------------------- Admin Routes -------------------
// Create product (admin only)
router.post('/', authMiddleware, isAdmin, upload.single('image'), createProduct);

// Update product (admin only)
router.put('/:id', authMiddleware, isAdmin, upload.single('image'), updateProduct);

// Delete product (admin only)
router.delete('/:id', authMiddleware, isAdmin, deleteProduct);

module.exports = router;
