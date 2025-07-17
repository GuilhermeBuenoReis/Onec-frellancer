import { createBrowserRouter } from 'react-router';
import { guestRoutes } from './guest';
import { protectedRoutes } from './protected';
// import { protectedRoutes } from './protected';

export const appRoutes = createBrowserRouter([
  ...guestRoutes,
  ...protectedRoutes,
]);
