import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IP } from "@/routes/IPConfig";
import { getAllProductsResponse, getProductByIdResponse } from "@/lib/types";

const baseUrl = `${IP}/product`;

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<getAllProductsResponse, void>({
      query: () => `${baseUrl}`,
      providesTags: ["product"],
    }),

    getProductById: builder.query<getProductByIdResponse, string>({
      query: (productId: string) => `${baseUrl}/${productId}`,
    }),
  }),
});

export const { useGetAllProductsQuery, useGetProductByIdQuery } = productApi;
