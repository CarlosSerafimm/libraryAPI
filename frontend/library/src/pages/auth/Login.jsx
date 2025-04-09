import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import InputWrapper from "../../components/InputWrapper";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ toggle }) {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        login,
        senha,
      });

      const { token } = response.data;
      console.log(token);

      localStorage.setItem("token", token);
      navigate("/livros");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("Credenciais inválidas ou erro no servidor.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-lg flex flex-col justify-center space-y-6 transition-all duration-500">
      <h1 className="text-center text-4xl font-bold text-blue-700">
        Bem-vindo
      </h1>
      <p className="text-center text-gray-500">
        Entre com seus dados para continuar
      </p>

      <form className="flex flex-col space-y-5" onSubmit={handleLogin}>
        <InputWrapper icon={User}>
          <input
            type="text"
            placeholder="Usuário"
            className="flex-1 bg-transparent outline-none text-gray-700"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </InputWrapper>

        <InputWrapper icon={Lock}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            className="flex-1 bg-transparent outline-none text-gray-700"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 ml-2"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </InputWrapper>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md shadow-lg transition-all duration-300"
        >
          Entrar
        </button>
      </form>

      <div className="text-center">
        <button
          onClick={toggle}
          className="text-sm text-blue-600 hover:text-blue-800 underline transition"
        >
          Não tem uma conta? Cadastre-se
        </button>
      </div>
    </div>
  );
}

export default Login;
