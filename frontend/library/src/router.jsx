import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Auth from "./pages/auth/auth";
import Livros from "./pages/livros/Livros";
import Usuarios from "./pages/usuarios/Usuarios";

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
        path: "livros",
        element: <Livros />,
      },
      {
        path: "usuarios",
        element: <Usuarios />,
      },
    ],
  },
]);

export default router;
