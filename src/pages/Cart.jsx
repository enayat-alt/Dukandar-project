// import React from "react";
// import { useCart } from "../context/CartContext";

// const Cart = () => {
//   const { cart, dispatch } = useCart();

//   if (!cart || cart.length === 0) {
//     return <p className="text-center mt-10">Your cart is empty 🛒</p>;
//   }

//   // ✅ Calculate totals
//   const totalItems = cart.length;
//   const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

//   const handlePlaceOrder = () => {
//     // save order to localStorage (simulate backend)
//     const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
//     const newOrder = {
//       id: Date.now(),
//       items: cart,
//       totalPrice,
//       date: new Date().toLocaleString(),
//     };

//     localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

//     // clear the cart after placing order
//     dispatch({ type: "CLEAR_CART" });

//     alert("✅ Order placed successfully!");
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

//       {cart.map((item) => (
//         <div
//           key={item.id}
//           className="flex justify-between items-center border-b py-3"
//         >
//           <div className="flex items-center gap-4">
//             <img src={item.image} alt={item.title} className="w-12 h-12" />
//             <p>{item.title}</p>
//           </div>
//           <div className="flex gap-4 items-center">
//             <p className="text-pink-600 font-semibold">₹{item.price}</p>
//             <button
//               className="text-red-600"
//               onClick={() =>
//                 dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
//               }
//             >
//               Remove
//             </button>
//           </div>
//         </div>
//       ))}

//       {/* ✅ Order Summary */}
//       <div className="mt-6 border-t pt-4">
//         <div className="flex justify-between text-lg">
//           <p>Total Items:</p>
//           <p>{totalItems}</p>
//         </div>
//         <div className="flex justify-between text-lg font-semibold">
//           <p>Total Price:</p>
//           <p>₹{totalPrice.toFixed(2)}</p>
//         </div>

//         <button
//           onClick={handlePlaceOrder}
//           className="mt-6 w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cart;


// import React, { useMemo } from "react";
// import { useCart } from "../context/CartContext.jsx";
// import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

// const Cart = () => {
//   const { cart, dispatch } = useCart();
//   const user = useSelector((state) => state.auth.user);
//   const navigate = useNavigate();

//   // Calculate total price
//   const totalPrice = useMemo(() => {
//     return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
//   }, [cart]);

//   // Remove item from cart
//   const handleRemove = (id) => {
//     dispatch({ type: "REMOVE_FROM_CART", payload: id });
//   };

//   // Place order
//   const handlePlaceOrder = () => {
//     if (!user) {
//       alert("Please login first!");
//       navigate("/login");
//       return;
//     }

//     if (cart.length === 0) {
//       alert("Cart is empty!");
//       return;
//     }

//     dispatch({
//       type: "PLACE_ORDER",
//       payload: {
//         items: cart,
//         totalPrice: totalPrice,
//         userEmail: user.email,
//       },
//     });

//     alert("Order placed successfully!");
//     navigate("/orders"); // redirect to Orders page
//   };

//   if (cart.length === 0) {
//     return (
//       <div className="max-w-4xl mx-auto mt-8 p-4 text-center">
//         <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
//         <Link to="/" className="text-pink-600 hover:underline">
//           Go Back to Shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto mt-8 p-4">
//       <h2 className="text-2xl font-bold mb-4">My Cart</h2>

//       <div className="flex flex-col gap-4">
//         {cart.map((item) => (
//           <div
//             key={item.id}
//             className="border p-4 rounded shadow flex justify-between items-center"
//           >
//             <div className="flex items-center gap-4">
//               <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
//               <div>
//                 <p className="font-semibold">{item.name}</p>
//                 <p>₹{item.price.toFixed(2)}</p>
//                 <p>Quantity: {item.quantity || 1}</p>
//               </div>
//             </div>
//             <button
//               onClick={() => handleRemove(item.id)}
//               className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 flex justify-between items-center">
//         <p className="text-xl font-bold">Total: ₹{totalPrice.toFixed(2)}</p>
//         <button
//           onClick={handlePlaceOrder}
//           className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cart;


import React, { useMemo } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, dispatch } = useCart();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  }, [cart]);

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const handlePlaceOrder = () => {
    if (!user) {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    dispatch({
      type: "PLACE_ORDER",
      payload: {
        items: cart,
        totalPrice: totalPrice,
        userEmail: user.email,
      },
    });

    alert("Order placed successfully!");
    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-8 p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500">Add some products to place an order.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">My Cart</h2>
      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded shadow flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.name || item.title} className="w-20 h-20 object-cover" />
              <div>
                <p className="font-semibold">{item.name || item.title}</p>
                <p>₹{item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity || 1}</p>
              </div>
            </div>
            <button
              onClick={() => handleRemove(item.id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold">Total: ₹{totalPrice.toFixed(2)}</p>
        <button
          onClick={handlePlaceOrder}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
