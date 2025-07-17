import { Negotiation } from '../features/app/pages/negotiation/negotiation';
import { Partner } from '../features/app/pages/partner/partner';
import { Pending } from '../features/app/pages/pending/pending';
import { _AppLayout } from '../layouts/_app_layout';

export const protectedRoutes = [
  {
    path: '/app',
    element: <_AppLayout />,
    children: [
      {
        path: 'negotiation',
        element: <Negotiation />,
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
