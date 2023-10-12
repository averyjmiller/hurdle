import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/home.jsx";
import Profile from "./pages/profile.jsx";
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Error from "./pages/error.jsx";
import Messaging from "./pages/messaging.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profiles/:profileId",
        element: <Profile />,
      },
      {
        path: "/messaging",
        element: <Messaging />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
