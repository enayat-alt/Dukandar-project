import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../services/productApi";
import { Snackbar, Alert, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const user = useSelector((state) => state.auth.user);
  const [quantity, setQuantity] = useState(1);

  const { data: products, isLoading, isError } = useGetProductsQuery();
  const product = products?.find((p) => p.id === parseInt(id));

  const inStock = product?.stock && product.stock > 0;

  // Snackbar state
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };

  const handleAddToCart = () => {
    if (!user) {
      setSnackbar({ open: true, message: "Please login first!", severity: "warning" });
      return;
    }

    if (!inStock) {
      setSnackbar({ open: true, message: "Product is out of stock!", severity: "error" });
      return;
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity },
    });

    setSnackbar({ open: true, message: `${quantity} item(s) added to cart!`, severity: "success" });
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError || !product) return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4 relative">
      {/* Back Button in top-right */}
      <div className="absolute top-0 right-0">
        <IconButton
          size="small"
          onClick={() => navigate(-1)}
          sx={{ color: "gray" }}
        >
          <ArrowBackIcon />
        </IconButton>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mt-6">
        {/* Product Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] md:h-[500px] object-contain rounded"
          />
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 flex flex-col gap-4">
          {product.brand && <p className="text-sm font-semibold text-gray-500">{product.brand}</p>}
          <h2 className="text-2xl font-bold text-gray-900">{product.title}</h2>
          <p className={`text-sm font-semibold ${inStock ? "text-green-600" : "text-red-600"}`}>
            {inStock ? "In Stock" : "Out of Stock"}
          </p>

          <div className="flex items-center gap-2">
            <p className="text-xl font-bold text-gray-900">₹{product.price}</p>
            {product.mrp && product.mrp > product.price && (
              <>
                <span className="text-sm line-through text-gray-400">₹{product.mrp}</span>
                <span className="text-sm font-semibold text-pink-600">
                  {Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
                </span>
              </>
            )}
          </div>

          <p className="text-gray-700">{product.description || "No description available."}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={handleDecrement}
              className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="px-4 py-1 border rounded">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`mt-4 px-6 py-2 rounded font-semibold transition ${
              inStock
                ? "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ProductDetails;
