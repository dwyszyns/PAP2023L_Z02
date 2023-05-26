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
  tagTypes: ['FriendRequests', 'Events', 'Calendars', 'Calendar', 'CalendarMembers', 'Notifications', 'Member'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query() {
        return {
          url: 'auth/login',
          method: 'GET',
        };
      },
      invalidatesTags: ['FriendRequests', 'Events', 'Calendars', 'Calendar', 'CalendarMembers', 'Notifications', 'Member'],
    }),
    getMemberById: builder.query({
      query: (id) => `member/${id}`,
      providesTags: ['Member'],
    }),
    getCalendarsForMemberId: builder.query({
      query: (id) => `calendar/member/${id}`,
      providesTags: ['Calendars'],
    }),
    getCalendarByCalendarId: builder.query({
      query: (id) => `calendar/${id}`,
      providesTags: ['Calendar'],
    }),
    getCalendarMembersByCalendarId: builder.query({
      query: (id) => `calendar/${id}/member`,
      providesTags: ['CalendarMembers'],
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
    searchMembers: builder.query({
      query: (filter) => `/member/search/${filter}`,
      providesTags: ['FriendRequests'],
    }),
    acceptRequestForMemberIdAndRequestId: builder.mutation({
      query(requestId) {
        return {
          url: `member/current/friends/${requestId}`,
          method: 'POST',
        };
      },
      invalidatesTags: ['FriendRequests'],
    }),
    declineRequestForMemberIdAndRequestId: builder.mutation({
      query(requestId) {
        return {
          url: `member/current/friends/${requestId}`,
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
      invalidatesTags: ['Notifications'],
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
    updateMemberRole: builder.mutation({
      query: ({ calendarId, memberId, role }) => ({
        url: `/calendar/${calendarId}/member/${memberId}?role=${role}`,
        method: 'POST',
      }),
      invalidatesTags: ['CalendarMembers'],
    }),
    removeMemberFromCalendar: builder.mutation({
      query: ({ calendarId, memberId }) => ({
        url: `/calendar/${calendarId}/member/${memberId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CalendarMembers'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useAddEventMutation,
  useRemoveEventMutation,
  useAddCalendarMutation,
  useRemoveCalendarMutation,
  useUpdateMemberRoleMutation,
  useRemoveMemberFromCalendarMutation,
  useAddNotificationMutation,
  useRemoveNotificationMutation,
  useGetNotificationsForMemberQuery,
  useGetNotificationsForEventQuery,
  useGetMemberByIdQuery,
  useSearchMembersQuery,
  useGetCalendarsForMemberIdQuery,
  useGetCalendarMembersByCalendarIdQuery,
  useGetCalendarByCalendarIdQuery,
  useGetFriendsForMemberIdQuery,
  useAcceptRequestForMemberIdAndRequestIdMutation,
  useDeclineRequestForMemberIdAndRequestIdMutation,
} = api;
