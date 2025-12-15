

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "../services/productApi"; // ✅ use API query

const ProductDetails = () => {
  const { id } = useParams(); // product id from URL
  const { dispatch } = useCart();
  const user = useSelector((state) => state.auth.user);
  const [quantity, setQuantity] = useState(1);

  // ✅ Get all products using productApi
  const { data: products, isLoading, isError } = useGetProductsQuery();

  // Find the product by id
  const product = products?.find((p) => p.id === parseInt(id));

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login first!");
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
    <div className="max-w-4xl mx-auto mt-8 p-4 flex flex-col md:flex-row gap-6">
      <img
        src={product.image}
        alt={product.name}
        className="w-full md:w-1/2 h-80 object-cover rounded"
      />
      <div className="flex-1 flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-pink-600 font-bold text-xl">₹{product.price}</p>
        <p>{product.description || "No description available"}</p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrement}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span className="px-3 py-1 border rounded">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 w-max"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
