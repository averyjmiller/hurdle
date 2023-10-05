import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    // children: [
    //   {
    //     index: true,
    //     element: 
    //   }, {
    //     path: '/',
    //     element: 
    //   }, {
    //     path: '/',
    //     element: 
    //   },
    // ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
