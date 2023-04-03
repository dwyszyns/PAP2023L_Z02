import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { username: localStorage.getItem('username'), password: localStorage.getItem('password') },
  reducers: {
    setCredentials: (
      state,
      { payload: { username, password } },
    ) => {
      // eslint-disable-next-line no-param-reassign
      state.username = username;
      // eslint-disable-next-line no-param-reassign
      state.password = password;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;
