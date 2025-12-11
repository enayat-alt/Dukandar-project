

import React, { createContext, useReducer, useContext, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
  wishlist: [],
  orders: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      if (state.cart.find((item) => item.id === action.payload.id)) return state;
      return { ...state, cart: [...state.cart, action.payload] };

    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };

    case "ADD_TO_WISHLIST":
      return { ...state, wishlist: [...state.wishlist, action.payload] };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "SET_ORDERS":
      return { ...state, orders: action.payload };

    // ✅ DELETE ORDER
    case "DELETE_ORDER":
      return {
        ...state,
        orders: state.orders.filter((o) => o.id !== action.payload),
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // FETCH ORDERS WHEN APP LOADS
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:5000/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (res.ok) {
          // decode token to get userId
          const payload = JSON.parse(atob(token.split(".")[1]));
          const userOrders = data.filter((order) => order.userId === payload.id);

          dispatch({ type: "SET_ORDERS", payload: userOrders });
        } else {
          console.error("Failed to fetch orders:", data.message);
        }
      } catch (err) {
        console.error("Fetch orders error:", err);
      }
    };

    fetchOrders();
  }, []);

  // PLACE ORDER
  const placeOrder = async (cartItems) => {
    const token = localStorage.getItem("token");
    if (!token) return { success: false, message: "User not logged in" };

    try {
      const res = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await res.json();

      if (res.ok) {
        dispatch({ type: "SET_ORDERS", payload: [...state.orders, data.order] });
        dispatch({ type: "CLEAR_CART" });
        return { success: true, order: data.order };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error("Place order error:", err);
      return { success: false, message: "Failed to place order" };
    }
  };

  // ✅ DELETE ORDER (Cancel & refresh orders)
  const deleteOrder = async (orderId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5000/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        // Remove order from state
        dispatch({ type: "DELETE_ORDER", payload: orderId });

        // Refetch updated orders from backend
        const resOrders = await fetch("http://localhost:5000/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const allOrders = await resOrders.json();
        if (resOrders.ok) {
          const payload = JSON.parse(atob(token.split(".")[1]));
          const userOrders = allOrders.filter((order) => order.userId === payload.id);
          dispatch({ type: "SET_ORDERS", payload: userOrders });
        }

        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error("Delete order error:", err);
      return { success: false, message: "Failed to delete order" };
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        wishlist: state.wishlist,
        orders: state.orders,
        dispatch,
        placeOrder,
        deleteOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
