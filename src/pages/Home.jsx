

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  // Real working HD fashion offer banners (Unsplash)
  const banners = [
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=80",
  ];

  // Get search query from URL
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";

  // Fetch products
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => {
        const formattedProducts = data.products.map((p) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          image:
            p.images && p.images.length > 0
              ? p.images[0]
              : `https://picsum.photos/200/200?random=${p.id}`,
          description: p.description,
          category: p.category,
        }));
        setProducts(formattedProducts);

        const uniqueCategories = Array.from(
          new Set(data.products.map((p) => p.category))
        );
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  // Filter products by category and search term
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchesSearch = searchQuery
      ? p.title.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery)
      : true;
    return matchesCategory && matchesSearch;
  });

  // Remove search query from URL if empty
  useEffect(() => {
    if (!searchQuery && location.search) {
      navigate("/", { replace: true });
    }
  }, [searchQuery, location.search, navigate]);

  // Banner slider auto change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000); // change every 5s
    return () => clearInterval(interval);
  }, []);

  // Categories
  const maxVisible = 6;
  const visibleCategories = categories.slice(0, maxVisible);
  const hiddenCategories = categories.slice(maxVisible);

  return (
    <div className="p-6">
      {/* Banner Slider */}
      <div className="mb-6 w-full h-64 relative overflow-hidden rounded">
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt={`banner-${index}`}
            className={`w-full h-64 object-cover absolute top-0 left-0 transition-opacity duration-700 ${
              currentBanner === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button
          className={`px-3 py-1 rounded ${
            selectedCategory === "all" ? "bg-pink-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setSelectedCategory("all")}
        >
          All
        </button>

        {visibleCategories.map((cat, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded ${
              selectedCategory === cat ? "bg-pink-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}

        {hiddenCategories.length > 0 && (
          <>
            {showMoreCategories &&
              hiddenCategories.map((cat, index) => (
                <button
                  key={`hidden-${index}`}
                  className={`px-3 py-1 rounded ${
                    selectedCategory === cat ? "bg-pink-600 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            <button
              className="px-3 py-1 rounded bg-gray-300"
              onClick={() => setShowMoreCategories(!showMoreCategories)}
            >
              {showMoreCategories ? "Less" : "More"}
            </button>
          </>
        )}
      </div>

      {/* Search result heading */}
      {searchQuery && (
        <h2 className="text-xl font-semibold mb-4">
          Showing results for: <span className="text-pink-600">{searchQuery}</span>
        </h2>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-600">No products found for your search.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
