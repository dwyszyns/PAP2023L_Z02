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
  tagTypes: ['FriendRequests', 'Events', 'Calendars', 'Calendar', 'Notifications'],
  endpoints: (builder) => ({
    login: builder.query({
      query: () => 'auth/login',
    }),
    getMemberById: builder.query({
      query: (id) => `member/${id}`,
    }),
    getCalendarsForMemberId: builder.query({
      query: (id) => `calendar/member/${id}`,
      providesTags: ['Calendars'],
    }),
    getCalendarByCalendarId: builder.query({
      query: (id) => `calendar/${id}`,
      providesTags: ['Calendar'],
    }),
    getFriendsForMemberId: builder.query({
      query: (id) => `member/${id}/friends`,
      providesTags: () => ['FriendRequests'],
    }),
    getNotificationsForEvent: builder.query({
      query: (id) => `notification/event/${id}`,
      providesTags: ['Notifications'],
    }),
    getNotificationsForMember: builder.query({
      query: (memberId) => `notification/member/${memberId}`,
      providesTags: ['Notifications'],
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
    addEvent: builder.mutation({
      query: (body) => ({
        url: '/events',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Calendar'],
    }),
    removeEvent: builder.mutation({
      query(eventId) {
        return {
          url: `/events/${eventId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Calendar'],
    }),
    removeCalendar: builder.mutation({
      query(calendarId) {
        return {
          url: `/calendar/${calendarId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Calendars'],

    }),
    addCalendar: builder.mutation({
      query: (body) => ({
        url: '/calendar',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Calendars'],
    }),
    addNotification: builder.mutation({
      query: (body) => ({
        url: '/notification',
        method: 'POST',
        body,
      }),
      providesTags: ['Notifications'],
    }),
    removeNotification: builder.mutation({
      query(notificationId) {
        return {
          url: `/notification/${notificationId}`,
          method: 'DELETE',
        };
      },
      providesTags: ['Notifications'],
    }),
  }),
});

export const {
  useLazyLoginQuery,
  useRegisterMutation,
  useAddEventMutation,
  useRemoveEventMutation,
  useAddCalendarMutation,
  useRemoveCalendarMutation,
  useAddNotificationMutation,
  useRemoveNotificationMutation,
  useGetNotificationsForMemberQuery,
  useGetNotificationsForEventQuery,
  useGetMemberByIdQuery,
  useGetCalendarsForMemberIdQuery,
  useGetCalendarByCalendarIdQuery,
  useGetFriendsForMemberIdQuery,
  useAcceptRequestForMemberIdAndRequestIdMutation,
  useDeclineRequestForMemberIdAndRequestIdMutation,
} = api;
