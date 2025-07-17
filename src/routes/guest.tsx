import { SignIn } from '../features/auth/pages/sign-in';
import { _AuthLayout } from '..//layouts/_auth-layout';

export const guestRoutes = [
  {
    path: '/sign-in',
    element: <_AuthLayout />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
    ],
  },
];
