import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const certificatesApi = createApi({
  reducerPath: "certificatesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:40443/",
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
  useGetAllCertificatesByEndUserIdQuery,
  useGetAllCertificatesQuery,
  useAddCertificateMutation,
} = certificatesApi;
