import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginUsersApi = createApi({
  reducerPath: "loginUsersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:40443/",
  }),
  endpoints: (builder) => ({
    loginEmployee: builder.mutation({
      query: (body) => ({
        url: "employees/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginEmployeeMutation,
} = loginUsersApi;
