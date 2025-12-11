import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        // Replace this URL with your backend endpoint
        const res = await fetch(
          `http://localhost:5000/products?category=${categoryName}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();

        // Assuming backend returns products array
        const formattedProducts = data.map((p) => ({
          id: p.id,
          title: p.name || p.title, // your backend field
          price: p.price,
          image:
            p.image ||
            `https://picsum.photos/200/200?random=${p.id}`,
          description: p.description,
          category: p.category,
          rating: p.rating || 0,
        }));

        setProducts(formattedProducts);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  if (loading) return <p className="p-6">Loading products...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

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

