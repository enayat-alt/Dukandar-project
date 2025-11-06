
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FilterSort from "../components/FilterShot";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCategories, setShowCategories] = useState(true);
  const [currentBanner, setCurrentBanner] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const navigate = useNavigate();
  const location = useLocation();

  const banners = [
    "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=80",
  ];

  // Search query from Navbar
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";

  // Fetch products and categories
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
          rating: p.rating,
        }));

        setProducts(formattedProducts);
        setFilteredProducts(formattedProducts);

        const uniqueCategories = Array.from(
          new Set(data.products.map((p) => p.category))
        );
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error(err));
  }, []);

  // Search filter
  useEffect(() => {
    if (!products.length) return;

    let updated = [...products];

    if (searchQuery) {
      updated = updated.filter((p) =>
        p.title.toLowerCase().includes(searchQuery)
      );
    }

    if (selectedCategory !== "all") {
      updated = updated.filter((p) => p.category === selectedCategory);
    }

    setFilteredProducts(updated);
  }, [searchQuery, selectedCategory, products]);

  // Banner slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => setCurrentPage(1), [filteredProducts]);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
  };

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

      {/* Toggle Categories */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Shop by Category</h2>
        <button
          className="px-3 py-1 rounded bg-pink-600 text-white"
          onClick={() => setShowCategories(!showCategories)}
        >
          {showCategories ? "Hide" : "Category"}
        </button>
      </div>

      {showCategories && (
        <div className="flex flex-wrap gap-3 mb-6">
          <div
            onClick={() => handleCategoryClick("all")}
            className={`cursor-pointer px-4 py-2 rounded ${
              selectedCategory === "all"
                ? "bg-pink-600 text-white"
                : "bg-gray-200 hover:bg-pink-100"
            }`}
          >
            All
          </div>
          {categories.map((cat) => (
            <div
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`cursor-pointer px-4 py-2 rounded capitalize ${
                selectedCategory === cat
                  ? "bg-pink-600 text-white"
                  : "bg-gray-100 hover:bg-pink-100"
              }`}
            >
              {cat}
            </div>
          ))}
        </div>
      )}

      {/* Filter & Sort */}
      <FilterSort products={products} onFilter={setFilteredProducts} />

      {/* Search heading */}
      {searchQuery && (
        <h2 className="text-xl font-semibold mb-4">
          Showing results for:{" "}
          <span className="text-pink-600">{searchQuery}</span>
        </h2>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-600">No products found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-pink-600 text-white hover:bg-pink-700"
            }`}
          >
            Prev
          </button>

          <span className="font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-pink-600 text-white hover:bg-pink-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
