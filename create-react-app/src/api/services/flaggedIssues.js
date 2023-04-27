import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// need
// flaggedIssues by business id
// seen / unseen

export const flaggedIssuesApi = createApi({
  reducerPath: "flaggedIssuesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:40443/",
  }),
  tagTypes: ["flaggedIssues"],
  endpoints: (builder) => ({
    getAllFlaggedIssues: builder.query({
      query: () => `flaggedIssues`,
      providesTags: ["flaggedIssues"],
    }),
    getFlaggedIssueById: builder.query({
      query: (id) => `flaggedIssues/${id}`,
      providesTags: ["flaggedIssues"],
    }),
    getFlaggedIssuesByBusinessId: builder.query({
      query: (id) => `flaggedIssues/businesses/${id}`,
      providesTags: ["flaggedIssues"],
    }),
    deleteFlaggedIssue: builder.mutation({
      query: (id) => ({
        url: `flaggedIssues/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["flaggedIssues"],
    }),
  }),
});

export const {
    useGetAllFlaggedIssuesQuery,
    useGetFlaggedIssueByIdQuery,
    useGetFlaggedIssuesByBusinessIdQuery,
    useDeleteFlaggedIssueMutation
} = flaggedIssuesApi;
