import { getAuthorities } from "@/api/getAuthorities";
import { createContext, useState, useEffect, useContext } from "react";

const AuthoritiesContext = createContext();

export function AuthoritiesProvider({ children }) {
  const [authorities, setAuthorities] = useState([]);

  useEffect(() => {
    // Evita carregar authorities quando está na página de autenticação
    if (window.location.pathname === "/auth") return;

    // Função assíncrona para carregar as authorities
    async function carregar() {
      try {
        const data = await getAuthorities();
        const nomes = data.map((a) => a.name); // Assume que 'name' seja o campo desejado
        setAuthorities(nomes); // Atualiza o estado com os nomes das authorities
      } catch (error) {
        console.error("Erro ao carregar authorities", error);
      }
    }

    carregar(); // Chama a função para carregar as authorities
  }, []); // O useEffect será chamado apenas uma vez quando o componente for montado

  return (
    <AuthoritiesContext.Provider value={authorities}>
      {children} {/* Provedor do contexto com as authorities carregadas */}
    </AuthoritiesContext.Provider>
  );
}

export function useAuthorities() {
  return useContext(AuthoritiesContext); // Retorna as authorities do contexto
}
