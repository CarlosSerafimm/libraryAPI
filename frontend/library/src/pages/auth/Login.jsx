import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import InputWrapper from "../../components/InputWrapper";

function Login({ toggle }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-lg flex flex-col justify-center space-y-6 transition-all duration-500">
      <h1 className="text-center text-4xl font-bold text-blue-700">
        Bem-vindo
      </h1>
      <p className="text-center text-gray-500">
        Entre com seus dados para continuar
      </p>

      <form className="flex flex-col space-y-5">
        <InputWrapper icon={User}>
          <input
            type="text"
            placeholder="Usuário"
            className="flex-1 bg-transparent outline-none text-gray-700"
          />
        </InputWrapper>

        <InputWrapper icon={Lock}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            className="flex-1 bg-transparent outline-none text-gray-700"
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
