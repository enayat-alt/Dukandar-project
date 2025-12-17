
import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const inStock = product.stock && product.stock > 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition cursor-pointer flex flex-col">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain p-4"
        />
      </div>

      <div className="px-3 pb-3 flex flex-col flex-grow">
        {/* Brand Name */}
        {product.brand && (
          <p className="text-xs text-gray-900 font-semibold">{product.brand}</p>
        )}

        {/* Product Title - bigger and black */}
        <h3 className="text-base text-black font-semibold mt-1 line-clamp-2">
          {product.title}
        </h3>

        {/* Category */}
        {product.category && (
          <p className="text-xs text-gray-900 mt-2 capitalize">{product.category}</p>
        )}

        {/* Short Description */}
        {product.description && (
          <p className="text-xs text-gray-600 mt-1 line-clamp-3">{product.description}</p>
        )}

        {/* Stock Status */}
        <p
          className={`text-xs font-semibold mt-1 ${
            inStock ? "text-green-600" : "text-red-600"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </p>

        {/* Price + MRP + Discount */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-semibold text-gray-900">
            ₹{product.price}
          </span>
          {product.mrp && product.mrp > product.price && (
            <>
              <span className="text-xs line-through text-gray-400">
                ₹{product.mrp}
              </span>
              <span className="text-xs font-semibold text-pink-600">
                {Math.round(((product.mrp - product.price) / product.mrp) * 100)}%
              </span>
            </>
          )}
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mt-1">
            <span className="text-yellow-500 text-xs">
              {"★".repeat(Math.floor(product.rating))}
            </span>
            <span className="text-gray-400 text-xs">({product.rating})</span>
          </div>
        )}

        {/* Additional Details */}
        {product.details && (
          <ul className="text-xs text-gray-600 mt-1 list-disc list-inside line-clamp-3">
            {product.details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        )}

        {/* Buy Now Button */}
        <button
          onClick={handleCardClick}
          disabled={!inStock}
          className={`mt-auto w-full border py-2 rounded text-sm font-semibold transition ${
            inStock
              ? "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {inStock ? "Buy Now" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
