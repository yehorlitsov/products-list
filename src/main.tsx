import React from 'react';
import ReactDOM from 'react-dom/client';
import Root from './root.tsx';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RouterUrls } from './utils/variables/router.variables.ts';
import IntventoryPage from './pages/inventory.page.tsx';
import AddProductPage from './pages/add-product.page.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    // loader: rootLoader, TODO
    children: [
      {
        path: RouterUrls.INVENTIRY_PAGE,
        element: <IntventoryPage />,
        // loader: loader, TODO
      },
      {
        path: RouterUrls.ADD_PRODUCT,
        element: <AddProductPage />,
        // loader: loader, TODO
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
