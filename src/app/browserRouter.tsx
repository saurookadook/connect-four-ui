import {
  createBrowserRouter, // force formatting
  type RouteObject,
} from 'react-router-dom';

import { Root } from '@/layouts';
import { ConnectFour, Home, Login, MatchHistory } from '@/pages';

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
        path: 'login',
        // @ts-expect-error: I hope this is just temporarily missing
        label: 'Login',
        element: <Login />,
      },
      {
        path: 'match-history',
        // @ts-expect-error: I hope this is just temporarily missing
        label: 'Match History',
        element: <MatchHistory />,
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
