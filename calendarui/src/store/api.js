import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:8080/';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['FriendRequests'],
  endpoints: (builder) => ({
    getMemberById: builder.query({
      query: (id) => `member/${id}`,
    }),
    getCalendarsForMemberId: builder.query({
      query: (id) => `calendar/member/${id}`,
    }),
    getCalendarByCalendarId: builder.query({
      query: (id) => `calendar/${id}`,
    }),
    getFriendsForMemberId: builder.query({
      query: (id) => `member/${id}/friends`,
      providesTags: () => ['FriendRequests'],
    }),
    acceptRequestForMemberIdAndRequestId: builder.mutation({
      query({ memberId, requestId }) {
        return {
          url: `member/${memberId}/friends/${requestId}`,
          method: 'POST',
        };
      },
      invalidatesTags: ['FriendRequests'],
    }),
    declineRequestForMemberIdAndRequestId: builder.mutation({
      query({ memberId, requestId }) {
        return {
          url: `member/${memberId}/friends/${requestId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['FriendRequests'],
    }),
  }),
});

export const {
  useGetMemberByIdQuery,
  useGetCalendarsForMemberIdQuery,
  useGetCalendarByCalendarIdQuery,
  useGetFriendsForMemberIdQuery,
  useAcceptRequestForMemberIdAndRequestIdMutation,
  useDeclineRequestForMemberIdAndRequestIdMutation,
} = api;
