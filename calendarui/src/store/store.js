import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import { calendarSlice } from '../calendar/calendar-slice';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    calendars: calendarSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export default store;
