

import React, { useEffect, useState } from "react";

const FilterSort = ({ products, onFilter }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    setCategories(cats);
  }, [products]);

  useEffect(() => {
    const filtered = products
      .filter((p) => selectedCategory === "all" || p.category === selectedCategory)
      .filter((p) => (minPrice ? p.price >= minPrice : true))
      .filter((p) => (maxPrice ? p.price <= maxPrice : true))
      .filter((p) => (minRating ? p.rating >= minRating : true))
      .sort((a, b) => {
        if (sortOrder === "asc") return a.price - b.price;
        if (sortOrder === "desc") return b.price - a.price;
        return 0;
      });

    onFilter(filtered);
  }, [selectedCategory, minPrice, maxPrice, minRating, sortOrder, products, onFilter]);

  return (
    <div className="mb-6">
      {/* Filter Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-1 bg-yellow-100 text-gray-800 rounded hover:bg-pink-100 hover:text-pink-600 transition"
        >
          {isOpen ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filter Pills */}
      {isOpen && (
        <div className="flex flex-wrap gap-2 mb-4">
          <div
            onClick={() => setSelectedCategory("all")}
            className={`cursor-pointer px-4 py-2 rounded-full border ${
              selectedCategory === "all"
                ? "bg-gray-100 text-pink-600 border-pink-600"
                : "bg-white text-gray-700 border-gray-300 hover:border-pink-600 hover:text-pink-600"
            } transition`}
          >
            All
          </div>
          {categories.map((cat) => (
            <div
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer px-4 py-2 rounded-full border capitalize ${
                selectedCategory === cat
                  ? "bg-gray-100 text-pink-600 border-pink-600"
                  : "bg-white text-gray-700 border-gray-300 hover:border-pink-600 hover:text-pink-600"
              } transition`}
            >
              {cat}
            </div>
          ))}
        </div>
      )}

      {/* Price & Rating Inputs */}
      {isOpen && (
        <div className="flex flex-wrap gap-3 mb-4">
          <input
            type="number"
            placeholder="Min Price"
            className="p-2 border rounded w-24 focus:ring-1 focus:ring-pink-600 outline-none"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Max Price"
            className="p-2 border rounded w-24 focus:ring-1 focus:ring-pink-600 outline-none"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Min Rating"
            className="p-2 border rounded w-24 focus:ring-1 focus:ring-pink-600 outline-none"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            min="0"
            max="5"
            step="0.1"
          />
          <select
            className="p-2 border rounded focus:ring-1 focus:ring-pink-600 outline-none"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="asc">Price Low to High</option>
            <option value="desc">Price High to Low</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default FilterSort;
