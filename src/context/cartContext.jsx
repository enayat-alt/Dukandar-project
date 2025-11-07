


import React, { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
  wishlist: [],
  orders: JSON.parse(localStorage.getItem("orders")) || [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      if (state.cart.find((item) => item.id === action.payload.id)) return state;
      return { ...state, cart: [...state.cart, action.payload] };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "ADD_TO_WISHLIST":
      return { ...state, wishlist: [...state.wishlist, action.payload] };

    case "CLEAR_CART":
      return { ...state, cart: [] };

    case "PLACE_ORDER":
      const newOrder = {
        id: Date.now(),
        items: action.payload.items.map((i) => ({ ...i })), // copy of items
        totalPrice: action.payload.totalPrice || 0,
        userEmail: action.payload.userEmail,
        date: new Date().toLocaleString(),
      };
      const updatedOrders = [...state.orders, newOrder];
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      return { ...state, orders: updatedOrders, cart: [] };
      
      case "CANCEL_ORDER":
      const filtered = state.orders.filter((o) => o.id !== action.payload);
      localStorage.setItem("orders", JSON.stringify(filtered));
      return { ...state, orders: filtered };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        wishlist: state.wishlist,
        orders: state.orders,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
