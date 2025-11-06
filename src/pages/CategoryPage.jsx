import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

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

        const filtered = formattedProducts.filter(
          (p) => p.category === categoryName
        );

        setProducts(formattedProducts);
        setFilteredProducts(filtered);
      })
      .catch((err) => console.error(err));
  }, [categoryName]);

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
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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
