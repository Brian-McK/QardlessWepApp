import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const certificatesApi = createApi({
  reducerPath: "certificatesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:40443/",
  }),
  tagTypes: ["Certificates"],
  endpoints: (builder) => ({
    getAllCertificatesByBusinessId: builder.query({
      query: (businessId) => `businesses/${businessId}/certificates`,
      providesTags: ["Certificates"],
    }),
    getCertificateById: builder.query({
      query: (id) => `certificates/${id}`,
      providesTags: ["Certificates"],
    }),
    addCertificate: builder.mutation({
      query: (body) => ({
        url: "certificates",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Certificates"],
    }),
  }),
});

export const {
  useGetCertificateByIdQuery,
  useGetAllCertificatesByBusinessIdQuery,
  useAddCertificateMutation,
} = certificatesApi;
