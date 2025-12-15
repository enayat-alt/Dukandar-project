
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../services/productApi";

const ProductDetails = () => {
  const { id } = useParams();
  const { dispatch } = useCart();
  const user = useSelector((state) => state.auth.user);
  const [quantity, setQuantity] = useState(1);

  const { data: products, isLoading, isError } = useGetProductsQuery();
  const product = products?.find((p) => p.id === parseInt(id));

  const inStock = product?.stock && product.stock > 0; // add stock check

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login first!");
      return;
    }

    if (!inStock) {
      alert("Product is out of stock!");
      return;
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity },
    });

    alert(`${quantity} item(s) added to cart!`);
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError || !product)
    return <p className="text-center mt-10">Product not found</p>;

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4 flex flex-col md:flex-row gap-8">
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
        {/* Brand */}
        {product.brand && (
          <p className="text-sm font-semibold text-gray-500">{product.brand}</p>
        )}

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900">{product.title}</h2>

        {/* Stock Status */}
        <p className={`text-sm font-semibold ${inStock ? "text-green-600" : "text-red-600"}`}>
          {inStock ? "In Stock" : "Out of Stock"}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold text-gray-900">₹{product.price}</p>
          {product.mrp && product.mrp > product.price && (
            <>
              <span className="text-sm line-through text-gray-400">
                ₹{product.mrp}
              </span>
              <span className="text-sm font-semibold text-pink-600">
                {Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
              </span>
            </>
          )}
        </div>

        {/* Description */}
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
  );
};

export default ProductDetails;
