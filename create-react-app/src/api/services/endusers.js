import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const endUsersApi = createApi({
  reducerPath: "endUsersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://qardlessapi.azurewebsites.net/api/",
  }),
  tagTypes: ["EndUsers"],
  endpoints: (builder) => ({
    getAllEndUsers: builder.query({
      query: () => `endusers`,
      providesTags: ["EndUsers"],
    }),
    getEndUserById: builder.query({
      query: (id) => `endusers/${id}`,
      providesTags: ["EndUsers"],
    }),
    registerEndUser: builder.mutation({
      query: (body) => ({
        url: "endusers",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Endusers"],
    }),
    loginEndUser: builder.mutation({
      query: (body) => ({
        url: "endusers",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Endusers"],
    }),
  }),
});

export const {
  useGetAllEndUsersQuery,
  useGetEndUserByIdQuery,
  useRegisterEndUserMutation,
  useLoginEndUserMutation,
} = endUsersApi;
