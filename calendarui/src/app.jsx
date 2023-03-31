import { hot } from 'react-hot-loader';
import React from 'react';
import './app.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Main from './main/main';
import MemberProfile from './member/member-profile';
import CalendarElement from './calendar/calendar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: 'member/:memberId',
        element: <MemberProfile />,
      },
      {
        path: 'calendar/:calendarId',
        element: <CalendarElement />,
      },
    ],
  },
]);

const App = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

export default hot(module)(App);
