// // src/context/CartContext.jsx
// import React, { createContext, useReducer, useContext } from "react";

// const CartContext = createContext();

// const initialState = {
//   cart: [],
//   wishlist: [],
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_TO_CART":
//       // prevent duplicates
//       if (state.cart.find((item) => item.id === action.payload.id)) return state;
//       return { ...state, cart: [...state.cart, action.payload] };

//     case "REMOVE_FROM_CART":
//       return {
//         ...state,
//         cart: state.cart.filter((item) => item.id !== action.payload),
//       };

//     case "ADD_TO_WISHLIST":
//       return { ...state, wishlist: [...state.wishlist, action.payload] };
//          case "CLEAR_CART":
//       return { ...state, cart: [] };

//     default:
//       return state;
//   }
// };

// export const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <CartContext.Provider
//       value={{
//         cart: state.cart,
//         wishlist: state.wishlist,
//         dispatch,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
// import React, { createContext, useReducer, useContext } from "react";

// const CartContext = createContext();

// const initialState = {
//   cart: [],
//   wishlist: [],
//   orders: JSON.parse(localStorage.getItem("orders")) || [], // load saved orders
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_TO_CART":
//       // prevent duplicates
//       if (state.cart.find((item) => item.id === action.payload.id)) return state;
//       return { ...state, cart: [...state.cart, action.payload] };

//     case "REMOVE_FROM_CART":
//       return {
//         ...state,
//         cart: state.cart.filter((item) => item.id !== action.payload),
//       };

//     case "ADD_TO_WISHLIST":
//       return { ...state, wishlist: [...state.wishlist, action.payload] };

//     case "CLEAR_CART":
//       return { ...state, cart: [] };

//     case "PLACE_ORDER":
//       const newOrder = {
//         id: Date.now(),
//         items: action.payload.items,
//         totalPrice: action.payload.totalPrice,
//         userEmail: action.payload.userEmail,
//         date: new Date().toLocaleString(),
//       };
//       const updatedOrders = [...state.orders, newOrder];
//       localStorage.setItem("orders", JSON.stringify(updatedOrders));
//       return { ...state, orders: updatedOrders, cart: [] }; // clear cart after order

//     default:
//       return state;
//   }
// };

// export const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <CartContext.Provider
//       value={{
//         cart: state.cart,
//         wishlist: state.wishlist,
//         orders: state.orders,
//         dispatch,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);

// import React, { createContext, useReducer, useContext } from "react";

// const CartContext = createContext();

// const initialState = {
//   cart: [],
//   wishlist: [],
//   orders: JSON.parse(localStorage.getItem("orders")) || [],
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_TO_CART":
//       if (state.cart.find((item) => item.id === action.payload.id)) return state;
//       return { ...state, cart: [...state.cart, action.payload] };

//     case "REMOVE_FROM_CART":
//       return {
//         ...state,
//         cart: state.cart.filter((item) => item.id !== action.payload),
//       };

//     case "ADD_TO_WISHLIST":
//       return { ...state, wishlist: [...state.wishlist, action.payload] };

//     case "CLEAR_CART":
//       return { ...state, cart: [] };

//     case "PLACE_ORDER":
//       const newOrder = {
//         id: Date.now(),
//         items: action.payload.items.map((i) => ({ ...i })), // copy of items
//         totalPrice: action.payload.totalPrice || 0,
//         userEmail: action.payload.userEmail,
//         date: new Date().toLocaleString(),
//       };
//       const updatedOrders = [...state.orders, newOrder];
//       localStorage.setItem("orders", JSON.stringify(updatedOrders));
//       return { ...state, orders: updatedOrders, cart: [] };

//     default:
//       return state;
//   }
// };

// export const CartProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <CartContext.Provider
//       value={{
//         cart: state.cart,
//         wishlist: state.wishlist,
//         orders: state.orders,
//         dispatch,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);


// const reducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_TO_CART":
//       if (state.cart.find((item) => item.id === action.payload.id)) return state;
//       return { ...state, cart: [...state.cart, action.payload] };

//     case "REMOVE_FROM_CART":
//       return {
//         ...state,
//         cart: state.cart.filter((item) => item.id !== action.payload),
//       };

//     case "ADD_TO_WISHLIST":
//       return { ...state, wishlist: [...state.wishlist, action.payload] };

//     case "CLEAR_CART":
//       return { ...state, cart: [] };

//     case "PLACE_ORDER":
//       const newOrder = {
//         id: Date.now(),
//         items: action.payload.items.map((i) => ({ ...i })),
//         totalPrice: action.payload.totalPrice || 0,
//         userEmail: action.payload.userEmail,
//         date: new Date().toLocaleString(),
//       };
//       const updatedOrders = [...state.orders, newOrder];
//       localStorage.setItem("orders", JSON.stringify(updatedOrders));
//       return { ...state, orders: updatedOrders, cart: [] };

//     case "CANCEL_ORDER":
//       const remainingOrders = state.orders.filter((o) => o.id !== action.payload);
//       localStorage.setItem("orders", JSON.stringify(remainingOrders));
//       return { ...state, orders: remainingOrders };

//     default:
//       return state;
//   }
// };



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
