import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Auth from "./pages/auth/auth";
import Home from "./pages/home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth" />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
]);

export default router;
