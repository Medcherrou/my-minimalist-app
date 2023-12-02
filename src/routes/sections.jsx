import { lazy, Suspense } from 'react';
import { Outlet , useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const FileUploadPage = lazy(() => import('src/pages/fileUpload'));
// ----------------------------------------------------------------------

export default function Router() {
  
  
  const routes = useRoutes([
    {
      path: '/login',
      element: <LoginPage />,
    },  
    {
      path:'/',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: '/user', element: <UserPage /> },
        { path:'/fileupload',element:<FileUploadPage />},
      ],
    },  
    {
      path: '/register',
      element: <RegisterPage />,
    },
    
  ]);

  return routes;
}
