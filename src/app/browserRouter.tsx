import {
  createBrowserRouter, // force formatting
  type RouteObject,
} from 'react-router-dom';

import { Root } from '@src/layouts';
import { ConnectFour, Home, Messages } from '@src/pages';

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
        path: 'messages',
        // @ts-expect-error: I hope this is just temporarily missing
        label: 'Messages',
        element: <Messages />,
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
