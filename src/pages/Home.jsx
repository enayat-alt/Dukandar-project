
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import FilterSort from "../components/FilterShot";
import { useGetProductsQuery } from "../services/productApi";
import { paginate } from "../utils/pagination";

const Home = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCategories, setShowCategories] = useState(true);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const location = useLocation();
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
 

  const banners = [
    "https://image-tc.galaxy.tf/wijpeg-5hwpt4qbfrteko9t5pkqcyqn3/shopping-resize_standard.jpg?crop=69%2C0%2C1783%2C1337",
   "https://cdn.searchenginejournal.com/wp-content/uploads/2022/08/google-shopping-ads-6304dccb7a49e-sej.png",
  ];

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    if (products.length) {
      const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
      setCategories(uniqueCategories);
      setFilteredProducts(products);
    }
  }, [products]);


  useEffect(() => {
  if (!products.length) return;

  let updated = [...products];

  if (searchQuery) {
    const query = searchQuery.trim().toLowerCase();
    updated = updated.filter(
      (p) =>
        p.name?.toLowerCase().includes(query) || // search by name
        p.description?.toLowerCase().includes(query) // optional: search by description
    );
  }

  if (selectedCategory !== "all") {
    updated = updated.filter((p) => p.category === selectedCategory);
  }

  setFilteredProducts(updated);
  setCurrentPage(1);
}, [searchQuery, selectedCategory, products]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCategoryClick = (cat) => setSelectedCategory(cat);
  const handleNext = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage))
      setCurrentPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-600">Failed to load products.</p>;

  const { paginatedItems, totalPages } = paginate(filteredProducts, currentPage, productsPerPage);

  return (
    <div className="px-4 md:px-6 lg:px-12 py-6">
      {/* Banner Slider */}
      <div className="mb-6 w-full h-64 relative overflow-hidden rounded-xl shadow-lg">
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt={`banner-${index}`}
            className={`w-full h-64 object-cover absolute top-0 left-0 transition-opacity duration-700 rounded-xl ${
              currentBanner === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>
{/* Toggle Categories */}
<div className="flex justify-between items-center mb-4">
  <h2 className="text-2xl font-bold">Shop by Category</h2>
  <button
    className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200 transition"
    onClick={() => setShowCategories(!showCategories)}
  >
    {showCategories ? "Hide" : "Category"}
  </button>
</div>

{showCategories && (
  <div className="flex flex-wrap gap-4 mb-6">
    <div
      onClick={() => handleCategoryClick("all")}
      className={`cursor-pointer text-sm font-medium transition-colors duration-300 hover:underline hover:decoration-pink-600 ${
        selectedCategory === "all" ? "underline decoration-pink-600" : "text-gray-800"
      }`}
    >
      All
    </div>
    {categories.map((cat) => (
      <div
        key={cat}
        onClick={() => handleCategoryClick(cat)}
        className={`cursor-pointer text-sm font-medium capitalize transition-colors duration-300 hover:underline hover:decoration-pink-600 ${
          selectedCategory === cat ? "underline decoration-pink-600" : "text-gray-800"
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
          Showing results for: <span className="text-pink-600">{searchQuery}</span>
        </h2>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="text-gray-600">No products found.</p>
        )}
      </div>

    
{totalPages > 1 && (
  <div className="flex justify-center items-center gap-4 mt-8">
    <button
      onClick={handlePrev}
      disabled={currentPage === 1}
      className={`px-4 py-2 rounded ${
        currentPage === 1
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
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
          : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
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