


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useSelector } from "react-redux";

const ProductDetails = () => {
  const { id } = useParams(); // product id from URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // quantity state
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
          image:
            data.images && data.images.length > 0
              ? data.images[0]
              : `https://picsum.photos/200/200?random=${data.id}`,
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
      payload: { ...product, quantity },
    });

    alert(`${quantity} item(s) added to cart!`);
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 flex flex-col md:flex-row gap-6">
      <img
        src={product.image}
        alt={product.title}
        className="w-full md:w-1/2 h-80 object-cover rounded"
      />
      <div className="flex-1 flex flex-col gap-4">
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="text-pink-600 font-bold text-xl">₹{product.price}</p>
        <p>{product.description}</p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrement}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span className="px-3 py-1 border rounded">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 w-max"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
