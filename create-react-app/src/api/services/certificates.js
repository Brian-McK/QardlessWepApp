import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const certificatesApi = createApi({
  reducerPath: "certificatesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://qardlessapi.azurewebsites.net/api/",
  }),
  tagTypes: ["Certificates"],
  endpoints: (builder) => ({
    getAllCertificates: builder.query({
      query: () => `Certificates`,
      providesTags: ["Certificates"],
    }),
    getAllCertificatesByEndUserId: builder.query({
      query: (endUserId) => `endusers/${endUserId}/certificates/`,
      providesTags: ["Certificates"],
    }),
    getCertificateById: builder.query({
      query: (id) => `certificates/${id}`,
      providesTags: ["Certificates"],
    }),
  }),
});

export const {
  useGetCertificateByIdQuery,
  useGetAllCertificatesByEndUserIdQuery,
  useGetAllCertificatesQuery,
} = certificatesApi;
