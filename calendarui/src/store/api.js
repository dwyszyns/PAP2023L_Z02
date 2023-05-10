import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:8000/';

const getEncodedCredentials = (state) => btoa(`${state.auth.username}:${state.auth.password}`);

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery(
    {
      baseUrl,
      prepareHeaders: (headers, { getState, endpoint }) => {
        if (endpoint !== 'register') {
          headers.set('Authorization', `Basic ${getEncodedCredentials(getState())}`);
        }
        return headers;
      },
    },
  ),
  tagTypes: ['FriendRequests'],
  endpoints: (builder) => ({
    login: builder.query({
      query: () => 'auth/login',
    }),
    getMemberById: builder.query({
      query: (id) => `member/${id}`,
    }),
    getCalendarsForMemberId: builder.query({
      query: (id) => `calendar/member/${id}`,
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
    register: builder.mutation({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useLazyLoginQuery,
  useRegisterMutation,
  useGetMemberByIdQuery,
  useGetCalendarsForMemberIdQuery,
  useGetFriendsForMemberIdQuery,
  useAcceptRequestForMemberIdAndRequestIdMutation,
  useDeclineRequestForMemberIdAndRequestIdMutation,
} = api;
