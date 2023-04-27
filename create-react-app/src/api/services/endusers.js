import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const endUsersApi = createApi({
  reducerPath: "endUsersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:40443/",
  }),
  endpoints: (builder) => ({
    getEndUserById: builder.query({
      query: (id) => `endusers/${id}`,
    }),
  }),
});

export const { useGetEndUserById } = endUsersApi;
