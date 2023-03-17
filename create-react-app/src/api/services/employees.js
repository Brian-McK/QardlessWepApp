import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:40443/",
  }),
  endpoints: (builder) => ({
    logoutEmployee: builder.mutation({
      query: (body) => ({
        url: "employees/logout",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLogoutEmployeeMutation } = employeesApi;
