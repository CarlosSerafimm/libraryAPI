import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import {
  useAuthorities,
  AuthoritiesProvider,
} from "./contexts/AuthoritiesContext";
import { loadRouter } from "./router";
import { LoaderCircle } from "lucide-react";
import { isTokenValid } from "./api/auth";

function AppLoader() {
  const authorities = useAuthorities() || [];
  const tokenValido = isTokenValid();

  if (tokenValido && (!authorities || authorities.length === 0)) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-100">
        <LoaderCircle className="animate-spin text-slate-700" size={48} />
        <span className="ml-4 text-slate-700 text-lg font-medium">Carregando...</span>
      </div>
    );
  }

  const router = loadRouter(authorities);
  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthoritiesProvider>
      <AppLoader />
    </AuthoritiesProvider>
  </StrictMode>
);
