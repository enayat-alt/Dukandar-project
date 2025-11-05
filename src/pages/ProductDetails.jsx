

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const { id } = useParams(); // product id from URL
  const [product, setProduct] = useState(null);
  const { dispatch } = useCart();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const formattedProduct = {
          id: data.id,
          title: data.title,
          price: data.price,
          image: data.images && data.images.length > 0 ? data.images[0] : `https://picsum.photos/200/200?random=${data.id}`,
          description: data.description,
        };
        setProduct(formattedProduct);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login first!");
      return;
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity: 1 },
    });

    alert("Product added to cart!");
  };

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 flex flex-col md:flex-row gap-6">
      <img
        src={product.image}
        alt={product.title}
        className="w-full md:w-1/2 h-80 object-cover rounded"
      />
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <p className="text-pink-600 font-bold text-xl mb-4">₹{product.price}</p>
        <p className="mb-4">{product.description}</p>
        <button
          onClick={handleAddToCart}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
