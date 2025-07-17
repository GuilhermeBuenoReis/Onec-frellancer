import { Dashboard } from '../features/application/pages/dashboard/dashboard';
import { Partner } from '../features/application/pages/partner/partner';
import { Pending } from '../features/application/pages/pending/pending';
import { _AppLayout } from '../layouts/_app_layout';

export const protectedRoutes = [
  {
    path: '/app',
    element: <_AppLayout />,
    children: [
      {
        path: 'negotiation',
        element: <Dashboard />,
      },
      {
        path: 'partner',
        element: <Partner />,
      },
      {
        path: 'pending',
        element: <Pending />,
      },
    ],
  },
];
