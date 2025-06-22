import {
  createBrowserRouter, // force formatting
  type RouteObject,
} from 'react-router-dom';

import { Root } from '@/layouts';
import { ConnectFour, GameSessionHistory, Home, Login, Register } from '@/pages';

export const routerConfig: RouteObject[] = [
  {
    path: '/',
    element: <Root />,
    loader: async ({ request }) => {
      if (window.location.pathname === '/') {
        const homeUrl = new URL(request.url);
        homeUrl.pathname = '/home';

        return window.location.assign(homeUrl.toString());
      }
      return;
    },
    children: [
      {
        path: 'home',
        // @ts-expect-error: I hope this is just temporarily missing
        label: 'Home',
        element: <Home />,
      },
      {
        // TODO: make this page conditionally render Login/Register
        // or maybe consolidate into auth portal?
        path: 'login',
        // @ts-expect-error: I hope this is just temporarily missing
        label: 'Login',
        element: <Login />,
      },
      {
        // TODO: make this page conditionally render Login/Register
        path: 'register',
        // @ts-expect-error: I hope this is just temporarily missing
        label: 'Register',
        element: <Register />,
      },
      {
        path: 'game-session-history',
        // @ts-expect-error: I hope this is just temporarily missing
        label: 'Game Session History',
        element: <GameSessionHistory />,
      },
      {
        path: 'connect-four',
        // @ts-expect-error: I hope this is just temporarily missing
        label: 'ConnectFour',
        element: <ConnectFour />,
      },
    ],
  },
];

const browserRouter = createBrowserRouter(routerConfig);

export default browserRouter;
