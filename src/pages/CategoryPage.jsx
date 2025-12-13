


import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useGetProductsByCategoryQuery } from "../services/productApi";

const CategoryPage = () => {
  const { categoryName } = useParams();

  // RTK Query call
  const { data: products = [], isLoading, isError, error } =
    useGetProductsByCategoryQuery(categoryName);

  if (isLoading) return <p className="p-6">Loading products...</p>;
  if (isError) return <p className="p-6 text-red-600">{error?.message}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Category: <span className="text-pink-600">{categoryName}</span>
      </h1>

      <Link
        to="/"
        className="mb-4 inline-block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back to Home
      </Link>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
