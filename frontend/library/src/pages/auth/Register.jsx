import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import InputWrapper from "../../components/InputWrapper";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import axios from "axios";

function Register({ toggle }) {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const senhasIguais = senha && confirmaSenha && senha === confirmaSenha;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!senhasIguais) return;

    try {
      // 1. Registrar o usuário
      await axios.post("http://localhost:8080/auth/login", {
        login,
        senha,
      });

      // 2. Fazer login com o mesmo usuário
      const response = await axios.post("http://localhost:8080/auth/login", {
        login,
        senha,
      });

      const { token } = response.data;
      console.log(token);

      localStorage.setItem("token", token);
      navigate("/livros");
    } catch (error) {
      console.error("Erro no registro/login:", error);
      setErro("Erro ao criar conta. Verifique os dados ou tente novamente.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-lg flex flex-col justify-center space-y-6 transition-all duration-500">
      <h1 className="text-center text-4xl font-bold text-blue-700">
        Criar Conta
      </h1>
      <p className="text-center text-gray-500">
        Preencha os campos para se cadastrar
      </p>

      {erro && (
        <p className="text-center text-red-500 text-sm font-medium">{erro}</p>
      )}

      <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
        <InputWrapper icon={User}>
          <input
            type="text"
            placeholder="Nome de usuário"
            className="flex-1 bg-transparent outline-none text-gray-700"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </InputWrapper>

        <InputWrapper icon={Lock}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            className="flex-1 bg-transparent outline-none text-gray-700"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 ml-2"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </InputWrapper>

        <InputWrapper icon={Lock}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Digite novamente a senha"
            className="flex-1 bg-transparent outline-none text-gray-700"
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
            required
          />
        </InputWrapper>

        <button
          type="submit"
          disabled={!senhasIguais}
          className={`py-3 rounded-md font-medium shadow-lg transition-all duration-300 ${
            senhasIguais
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Cadastrar
        </button>
      </form>

      <div className="text-center">
        <button
          onClick={toggle}
          className="text-sm text-blue-600 hover:text-blue-800 underline transition"
        >
          Já tem uma conta? Entrar
        </button>
      </div>
    </div>
  );
}

export default Register;
