


import React, { useEffect, useState } from "react";

const FilterSort = ({ products, onFilter }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Banner images arrays
  const offerBannerSmall = [
    "https://static.vecteezy.com/system/resources/thumbnails/006/943/369/small/banner-sales-brush-yellow-mega-sale-discount-poster-vector.jpg",
    "https://t4.ftcdn.net/jpg/04/23/58/09/360_F_423580975_XkXWr7NLoaiwZqKhZGwkw5GzMkqIraDE.jpg",
  ];
  const offerBannerSecond = [
    "https://img.freepik.com/free-vector/mega-sale-offers-banner-template_1017-31299.jpg",
    "https://img.freepik.com/premium-vector/mega-sale-special-offer-banner-design-website-social-media-template_389520-330.jpg",
  ];

  const [currentSmall, setCurrentSmall] = useState(0);
  const [currentSecond, setCurrentSecond] = useState(0);

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

  // Banner animation effect
  useEffect(() => {
    const intervalSmall = setInterval(() => {
      setCurrentSmall((prev) => (prev + 1) % offerBannerSmall.length);
    }, 4000); // 4s per image

    const intervalSecond = setInterval(() => {
      setCurrentSecond((prev) => (prev + 1) % offerBannerSecond.length);
    }, 5000); // 5s per image

    return () => {
      clearInterval(intervalSmall);
      clearInterval(intervalSecond);
    };
  }, []);

  return (
    <div className="mb-6">
      {/* Toggle + Animated Banners Inline */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        >
          {isOpen ? "Hide Filters" : "Show Filters"}
        </button>

        {/* First Banner */}
        <div className="h-16 w-64 relative flex-shrink-0">
          {offerBannerSmall.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Banner Small ${index}`}
              className={`h-16 w-64 object-cover rounded shadow-md absolute top-0 left-0 transition-opacity duration-700 ${
                index === currentSmall ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/256x64?text=Offer";
              }}
            />
          ))}
        </div>

        {/* Second Banner */}
        <div className="h-16 w-64 relative flex-shrink-0">
          {offerBannerSecond.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Banner Second ${index}`}
              className={`h-16 w-64 object-cover rounded shadow-md absolute top-0 left-0 transition-opacity duration-700 ${
                index === currentSecond ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/256x64?text=Offer";
              }}
            />
          ))}
        </div>
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <div className="flex flex-wrap gap-4">
          <select
            className="p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Min Price"
            className="p-2 border rounded w-24"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Max Price"
            className="p-2 border rounded w-24"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Min Rating"
            className="p-2 border rounded w-24"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            min="0"
            max="5"
            step="0.1"
          />

          <select
            className="p-2 border rounded"
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
