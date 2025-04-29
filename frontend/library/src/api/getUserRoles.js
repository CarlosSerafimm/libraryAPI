import api from "./api";

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Erro ao decodificar o token", error);
    return null;
  }
}

export async function getUserRoles() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token não encontrado");
  }

  const decodedToken = parseJwt(token);
  if (!decodedToken?.sub) {
    throw new Error("Token inválido ou sem 'sub'");
  }

  const login = decodedToken.sub;

  try {
    const response = await api.get("/usuarios", {
      params: { login },
      headers: { Authorization: `Bearer ${token}` }
    });

    const user = response.data.content?.[0];
    return user?.roles?.map(role => role.roleName) || [];
  } catch (error) {
    console.error("Erro ao buscar roles:", error);
    throw error;
  }
}
