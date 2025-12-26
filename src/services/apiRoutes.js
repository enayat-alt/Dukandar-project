// Base URL
export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Auth routes
export const AUTH_ROUTES = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  REFRESH: "/auth/refresh",
};

// Admin routes
export const ADMIN_ROUTES = {
  LOGIN: "/admin/login",
  PRODUCTS: "/products",
   REGISTER: "/admin/register",
  ORDERS: "/orders",
};

// Product routes
export const PRODUCT_ROUTES = {
  GET_PRODUCTS: "/products",
  CREATE_PRODUCT: "/products",
  UPDATE_PRODUCT: (id) => `/products/${id}`,
  DELETE_PRODUCT: (id) => `/products/${id}`,
};
