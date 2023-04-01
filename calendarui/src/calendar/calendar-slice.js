import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
  calendars: [],
};

export const selectCalendarById = (id) => (state) => state.calendars.find((
  calendar,
) => calendar.id === id);

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addCalendar: (state, action) => {
      const calendar = {
        id: Math.random() * 100,
        text: action.payload,
      };
      state.calendars.push((calendar));
      state.count += 1;
    },
    removeCalendar: (state, action) => {
      state.calendars = state.calendars.filter((calendar) => calendar.id !== action.payload);
      state.count -= 1;
    },
  },
});

export const { addCalendar, removeCalendar } = calendarSlice.actions;

export default calendarSlice.reducer;
