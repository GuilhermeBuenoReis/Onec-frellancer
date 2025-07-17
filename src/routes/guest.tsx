import { SignIn } from '../features/auth/pages/sign-in';
import { AuthLayout } from '..//layouts/_auth-layout';

export const guestRoutes = [
  {
    path: '/sign-in',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
    ],
  },
];
