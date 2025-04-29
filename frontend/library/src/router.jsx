import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Auth from "./pages/auth/Auth";
import Livros from "./pages/livros/Livros";
import Usuarios from "./pages/usuarios/Usuarios";
import Autores from "./pages/autores/Autores";
import Cargos from "./pages/cargos/Cargos";
import { isTokenValid } from "./auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={isTokenValid() ? "/livros" : "/auth"} />,
  },
  {
    path: "/auth",
    element: isTokenValid() ? <Navigate to="/livros" /> : <Auth />,
  },
  {
    path: "/",
    element: isTokenValid() ? <App /> : <Navigate to="/auth" />,
    children: [
      {
        path: "livros",
        element: <Livros />,
      },
      {
        path: "usuarios",
        element: <Usuarios />,
      },
      {
        path: "autores",
        element: <Autores />,
      },
      {
        path: "cargos",
        element: <Cargos />,
      },
    ],
  },
]);

export default router;
