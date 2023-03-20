import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const certificatesApi = createApi({
  reducerPath: "certificatesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:40443/",
  }),
  tagTypes: ["certificates"],
  endpoints: (builder) => ({
    getAllCertificatesByBusinessId: builder.query({
      query: (businessId) => `businesses/${businessId}/certificates`,
      providesTags: ["certificates"],
    }),
    getCertificateById: builder.query({
      query: (id) => `certificates/${id}`,
      providesTags: ["certificates"],
    }),
    addCertificate: builder.mutation({
      query: (body) => ({
        url: "certificates",
        method: "POST",
        body,
      }),
      invalidatesTags: ["certificates"],
    }),
    deleteCertificate: builder.mutation({
      query: (id) => ({
        url: `certificates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["certificates"],
    }),
  }),
});

export const {
  useGetCertificateByIdQuery,
  useGetAllCertificatesByBusinessIdQuery,
  useAddCertificateMutation,
  useDeleteCertificateMutation
} = certificatesApi;
