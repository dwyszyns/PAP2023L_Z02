import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:8080/';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getMemberById: builder.query({
      query: (id) => `member/${id}`,
    }),
    getCalendarsForMemberId: builder.query({
      query: (id) => `calendar/member/${id}`,
    }),
  }),
});

export const { useGetMemberByIdQuery, useGetCalendarsForMemberIdQuery } = api;
