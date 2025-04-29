import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { User, Pencil, Trash2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import api from "@/api/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuthorities } from "@/contexts/AuthoritiesContext";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargos, setCargos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [rolesSelecionadas, setRolesSelecionadas] = useState([]);
  const [salvando, setSalvando] = useState(false);
  const [filtroLogin, setFiltroLogin] = useState("");
  const [filtroRole, setFiltroRole] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [rolesOriginais, setRolesOriginais] = useState([]);

  const authorities = useAuthorities();

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const buscarUsuarios = async (pagina = 0, login = "", role = "") => {
    try {
      const response = await api.get("/usuarios", {
        params: {
          login: login || undefined,
          roleName: role || undefined,
          pagina,
        },
      });

      setUsuarios(response.data.content);
      setTotalPaginas(response.data.totalPages);
      setPaginaAtual(pagina);

      if (cargos.length === 0) {
        const rolesResponse = await api.get("/roles");
        const roles = rolesResponse.data.map((role) => ({
          name: role.roleName,
          color: role.corRgba,
          modificavel: role.modificavel,
        }));
        setCargos(roles);
      }
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const salvarRoles = async () => {
    setSalvando(true);

    const login = usuarioSelecionado.login;
    const rolesAtuais = usuarioSelecionado.roles.map((r) => r.roleName);

    try {
      for (const role of rolesSelecionadas) {
        if (!rolesAtuais.includes(role.toUpperCase())) {
          await api.post("/usuarios/addRole", {
            login,
            roleName: role.toUpperCase(),
          });
        }
      }

      for (const role of rolesAtuais) {
        if (!rolesSelecionadas.includes(role.toUpperCase())) {
          await api.delete("/usuarios/remRole", {
            data: {
              login,
              roleName: role.toUpperCase(),
            },
          });
        }
      }

      setModalAberto(false);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao salvar roles:", error);
    } finally {
      setSalvando(false);
    }
  };

  const abrirModal = (user) => {
    const rolesUsuario = user.roles.map((r) => r.roleName);
    setUsuarioSelecionado(user);
    setRolesSelecionadas(rolesUsuario);
    setRolesOriginais(rolesUsuario);
    setModalAberto(true);
  };

  const handleCheckboxChange = (roleName) => {
    setRolesSelecionadas((prev) =>
      prev.includes(roleName)
        ? prev.filter((r) => r !== roleName)
        : [...prev, roleName]
    );
  };

  const houveModificacaoRoleNaoModificavel = () => {
    for (const cargo of cargos) {
      if (!cargo.modificavel) {
        const estavaMarcado = rolesOriginais.includes(cargo.name);
        const estaMarcadoAgora = rolesSelecionadas.includes(cargo.name);

        if (estavaMarcado !== estaMarcadoAgora) {
          return true; // mudou alguma role não modificável
        }
      }
    }
    return false;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Usuários</h1>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Username"
            className="w-full sm:w-60 px-4 py-2 rounded-lg border border-slate-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filtroLogin}
            onChange={(e) => setFiltroLogin(e.target.value)}
          />
          <Select
            value={filtroRole}
            onValueChange={(value) =>
              setFiltroRole(value === "todos" ? "" : value)
            }
          >
            <SelectTrigger className="w-full sm:w-60 bg-white border border-slate-300 shadow-sm rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500">
              <SelectValue placeholder="Todos os cargos" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="todos">
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                  Todos os cargos
                </div>
              </SelectItem>

              {cargos.map((cargo) => (
                <SelectItem key={cargo.name} value={cargo.name}>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: cargo.color || "#6b7280" }}
                    ></span>
                    {cargo.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={() => buscarUsuarios(0, filtroLogin, filtroRole)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-sm"
        >
          <Search className="mr-2 h-4 w-4" />
          Buscar
        </Button>
      </div>

      <div className="rounded-xl border bg-white shadow-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-100">
            <TableRow>
              <TableHead className="w-[80px] text-slate-600">Usuário</TableHead>
              <TableHead className="text-slate-600">Username</TableHead>
              <TableHead className="text-slate-600">Cargos</TableHead>
              {authorities.includes("usuario:addRole")  && (
                  <TableHead className="text-right text-slate-600">
                    Ações
                  </TableHead>
                )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {usuarios.map((user) => (
              <TableRow
                key={user.id}
                className="hover:bg-slate-50 transition-colors duration-200"
              >
                <TableCell>
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                    <User size={20} />
                  </div>
                </TableCell>
                <TableCell className="font-medium text-slate-800">
                  {user.login}
                </TableCell>
                <TableCell>
                  <ul className="flex flex-wrap gap-2 text-sm text-slate-600">
                    {user.roles.map((role, i) => {
                      const cargoInfo = cargos.find(
                        (c) => c.name === role.roleName
                      );
                      return (
                        <li
                          key={i}
                          className="px-3 py-1 rounded-full border border-slate-300 bg-slate-100 flex items-center gap-2"
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{
                              backgroundColor: cargoInfo?.color || "#6b7280",
                            }}
                          ></span>
                          {role.roleName}
                        </li>
                      );
                    })}
                  </ul>
                </TableCell>
                {authorities.includes("usuario:addRole") && (
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex gap-1 text-blue-600 border-blue-600 hover:bg-blue-50"
                          onClick={() => abrirModal(user)}
                        >
                          <Pencil size={16} />
                          Editar
                        </Button>
                      </div>
                    </TableCell>
                  )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
        {[...Array(totalPaginas)].map((_, index) => (
          <Button
            key={index}
            variant={paginaAtual === index ? "default" : "outline"}
            onClick={() => buscarUsuarios(index, filtroLogin, filtroRole)}
            className={`px-4 py-2 ${
              paginaAtual === index
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "text-slate-700 border-slate-300 hover:bg-slate-300"
            }`}
          >
            {index + 1}
          </Button>
        ))}
      </div>

      <Dialog open={modalAberto} onOpenChange={setModalAberto}>
        <DialogContent className="max-w-md rounded-2xl p-6 shadow-2xl border border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-slate-800">
              Editar Cargos de{" "}
              <span className="text-blue-600">{usuarioSelecionado?.login}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-4">
            {cargos.map((cargo) => (
              <label
                key={cargo.name}
                className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition"
              >
                <Checkbox
                  checked={rolesSelecionadas.includes(cargo.name)}
                  onCheckedChange={() => handleCheckboxChange(cargo.name)}
                  className="w-5 h-5 rounded-md border-2 appearance-none transition-all duration-200"
                  style={{
                    borderColor: cargo.color || "#94a3b8",
                    backgroundColor: rolesSelecionadas.includes(cargo.name)
                      ? cargo.color
                      : "transparent",
                  }}
                />

                <span className="text-slate-700 font-medium">{cargo.name}</span>
              </label>
            ))}

            <Button
              onClick={salvarRoles}
              disabled={salvando || houveModificacaoRoleNaoModificavel()}
              className={`mt-6 text-white rounded-lg shadow-md ${
                salvando || houveModificacaoRoleNaoModificavel()
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {salvando ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Usuarios;
