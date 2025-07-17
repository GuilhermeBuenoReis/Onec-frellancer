import { RouterProvider } from 'react-router';
import { appRoutes } from '../routes';

export function App() {
  return <RouterProvider router={appRoutes} />;
}
