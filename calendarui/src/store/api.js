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
  tagTypes: ['FriendRequests', 'Events', 'Calendars', 'Calendar', 'CalendarMembers'],
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
    getCalendarMembersByCalendarId: builder.query({
      query: (id) => `calendar/${id}/member`,
      providesTags: ['CalendarMembers'],
    }),
    getFriendsForMemberId: builder.query({
      query: (id) => `member/${id}/friends`,
      providesTags: () => ['FriendRequests'],
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
  useLazyLoginQuery,
  useRegisterMutation,
  useAddEventMutation,
  useRemoveEventMutation,
  useAddCalendarMutation,
  useRemoveCalendarMutation,
  useUpdateMemberRoleMutation,
  useRemoveMemberFromCalendarMutation,
  useGetMemberByIdQuery,
  useGetCalendarsForMemberIdQuery,
  useGetCalendarMembersByCalendarIdQuery,
  useGetCalendarByCalendarIdQuery,
  useGetFriendsForMemberIdQuery,
  useAcceptRequestForMemberIdAndRequestIdMutation,
  useDeclineRequestForMemberIdAndRequestIdMutation,
} = api;
