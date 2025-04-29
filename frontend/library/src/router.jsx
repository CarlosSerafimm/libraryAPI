import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Auth from "./pages/auth/Auth";
import Livros from "./pages/livros/Livros";
import Usuarios from "./pages/usuarios/Usuarios";
import Autores from "./pages/autores/Autores";
import Cargos from "./pages/cargos/Cargos";
import { isTokenValid } from "./api/auth";

// Função que gera o router dinamicamente
export function loadRouter(authorities) {
  const hasRoleAuthority = authorities.some((auth) => auth.startsWith("role"));
  const hasUsuarioAuthority = authorities.some((auth) => auth.startsWith("usuario"));

  return createBrowserRouter([
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
          path: "autores",
          element: <Autores />,
        },
        ...(hasUsuarioAuthority
          ? [{
              path: "usuarios",
              element: <Usuarios />,
            }]
          : []),
        ...(hasRoleAuthority
          ? [{
              path: "cargos",
              element: <Cargos />,
            }]
          : []),
      ],
    },
  ]);
}
