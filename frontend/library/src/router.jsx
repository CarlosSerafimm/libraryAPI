import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Auth from "./pages/auth/Auth";
import Livros from "./pages/livros/Livros";
import Usuarios from "./pages/usuarios/Usuarios";
import Autores from "./pages/autores/Autores";
import Cargos from "./pages/cargos/Cargos";

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
