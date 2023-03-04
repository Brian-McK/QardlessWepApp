import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const coursesApi = createApi({
  reducerPath: "coursesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://qardlessapi.azurewebsites.net/api/",
  }),
  tagTypes: ["Courses"],
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => `courses`,
      providesTags: ["Courses"],
    }),
    getAllCoursesByBusinessId: builder.query({
      query: (businessId) => `courses/${businessId}`,
      providesTags: ["Courses"],
    }),
    getCourseById: builder.query({
      query: (id) => `courses/${id}`,
      providesTags: ["Courses"],
    }),
    addCourse: builder.mutation({
      query: (body) => ({
        url: "courses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Courses"],
    }),
  }),
});

export const {
  useGetAllCoursesQuery,
  useGetAllCoursesByBusinessIdQuery,
  useGetCourseByIdQuery,
  useAddCourseMutation,
} = coursesApi;
