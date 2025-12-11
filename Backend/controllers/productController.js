
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else cb(new Error('Only images are allowed!'), false);
};
exports.upload = multer({ storage, fileFilter });

// Helper: build full image URL
const getImageUrl = (filename, req) =>
  filename ? `${req.protocol}://${req.get('host')}/uploads/${filename}` : null;

// ------------------ Create Product ------------------
exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, stock, description } = req.body;
    if (!name || !price || !category || !req.file)
      return res.status(400).json({ message: 'All fields including image are required' });

    const product = await Product.create({
      name,
      price,
      category,
      stock: stock || 0,
      description: description || null,
      image: req.file.filename,
      userId: req.user.id,
    });

    res.status(201).json({
      ...product.toJSON(),
      image: getImageUrl(product.image, req),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------------ Get All Products ------------------
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    const response = products.map((p) => ({
      ...p.toJSON(),
      image: getImageUrl(p.image, req),
    }));
    res.json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------------ Get Single Product ------------------
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json({
      ...product.toJSON(),
      image: getImageUrl(product.image, req),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------------ Update Product ------------------
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const { name, price, category, stock, description } = req.body;
    const updatedData = {
      name: name || product.name,
      price: price || product.price,
      category: category || product.category,
      stock: stock !== undefined ? stock : product.stock,
      description: description || product.description,
    };

    if (req.file) {
      // delete old image
      if (product.image) {
        const oldPath = path.join(__dirname, '../uploads', product.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updatedData.image = req.file.filename;
    }

    await product.update(updatedData);

    res.json({
      ...product.toJSON(),
      image: getImageUrl(updatedData.image, req), // <-- use updated image
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------------ Delete Product ------------------
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.image) {
      const filePath = path.join(__dirname, '../uploads', product.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await product.destroy();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
