
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    // Navigate to Product Details page
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="border rounded-md shadow hover:shadow-lg transition p-3 flex flex-col justify-between">
      <div>
        <img
          src={product.image}
          alt={product.title}
          className="h-40 mx-auto object-contain"
        />
        <h3 className="text-sm mt-2 font-medium truncate">{product.title}</h3>
        <p className="text-pink-600 font-semibold">₹{product.price}</p>
      </div>

      {/* Buy Now button */}
      <button
        onClick={handleBuyNow}
        className="mt-3 w-full bg-pink-600 text-white py-1 rounded hover:bg-pink-700"
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductCard;
