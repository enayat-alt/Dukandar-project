
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base URL of your backend
const baseUrl = 'http://localhost:5000';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().adminAuth?.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Products', 'Orders'],
  endpoints: (builder) => ({
    // Admin login
    loginAdmin: builder.mutation({
      query: (credentials) => ({
        url: '/admin/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // Get all products
    getProducts: builder.query({
      query: () => '/products',
      providesTags: ['Products'],
    }),

    // Add a product with FormData (image upload)
    addProduct: builder.mutation({
      query: (formData) => ({
        url: '/products',
        method: 'POST',
        body: formData, // FormData with image
        // Important: DO NOT set 'Content-Type'; browser sets it automatically
      }),
      invalidatesTags: ['Products'],
    }),

    // Delete a product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),

    // Get all orders
    getOrders: builder.query({
      query: () => '/orders',
      providesTags: ['Orders'],
    }),
  }),
});

export const {
  useLoginAdminMutation,
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetOrdersQuery,
} = adminApi;
