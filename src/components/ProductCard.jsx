// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-md shadow hover:shadow-lg transition p-3">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="h-40 mx-auto object-contain"
        />
        <h3 className="text-sm mt-2 font-medium truncate">{product.title}</h3>
        <p className="text-pink-600 font-semibold">₹{product.price}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
