
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { BASE_URL, ADMIN_ROUTES } from "./apiRoutes"; // ✅ import base URL & routes

// export const adminApi = createApi({
//   reducerPath: "adminApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: BASE_URL,
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState().adminAuth?.token;
//       if (token) headers.set("Authorization", `Bearer ${token}`);
//       return headers;
//     },
//   }),
//   tagTypes: ["Products", "Orders"],
//   endpoints: (builder) => ({
//     loginAdmin: builder.mutation({
//       query: (credentials) => ({
//         url: ADMIN_ROUTES.LOGIN,
//         method: "POST",
//         body: credentials,
//       }),
//     }),
//     getProducts: builder.query({
//       query: () => ADMIN_ROUTES.PRODUCTS,
//       providesTags: ["Products"],
//     }),
//     addProduct: builder.mutation({
//       query: (formData) => ({
//         url: ADMIN_ROUTES.PRODUCTS,
//         method: "POST",
//         body: formData,
//       }),
//       invalidatesTags: ["Products"],
//     }),
//     deleteProduct: builder.mutation({
//       query: (id) => ({
//         url: `${ADMIN_ROUTES.PRODUCTS}/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Products"],
//     }),
//     getOrders: builder.query({
//       query: () => ADMIN_ROUTES.ORDERS,
//       providesTags: ["Orders"],
//     }),
//   }),
// });

// export const {
//   useLoginAdminMutation,
//   useGetProductsQuery,
//   useAddProductMutation,
//   useDeleteProductMutation,
//   useGetOrdersQuery,
// } = adminApi;


import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, ADMIN_ROUTES } from "./apiRoutes";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().adminAuth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Products", "Orders"],
  endpoints: (builder) => ({
    // ✅ REGISTER ADMIN
    registerAdmin: builder.mutation({
      query: (adminData) => ({
        url: ADMIN_ROUTES.REGISTER,
        method: "POST",
        body: adminData,
      }),
    }),

    // ✅ LOGIN ADMIN
    loginAdmin: builder.mutation({
      query: (credentials) => ({
        url: ADMIN_ROUTES.LOGIN,
        method: "POST",
        body: credentials,
      }),
    }),

    // ✅ GET PRODUCTS
    getProducts: builder.query({
      query: () => ADMIN_ROUTES.PRODUCTS,
      providesTags: ["Products"],
    }),

    // ✅ ADD PRODUCT
    addProduct: builder.mutation({
      query: (formData) => ({
        url: ADMIN_ROUTES.PRODUCTS,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),

    // ✅ DELETE PRODUCT
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_ROUTES.PRODUCTS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    // ✅ GET ORDERS
    getOrders: builder.query({
      query: () => ADMIN_ROUTES.ORDERS,
      providesTags: ["Orders"],
      refetchOnMountOrArgChange: true,
    }),
  }),
});

export const {
  useRegisterAdminMutation,
  useLoginAdminMutation,
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetOrdersQuery,
} = adminApi;
