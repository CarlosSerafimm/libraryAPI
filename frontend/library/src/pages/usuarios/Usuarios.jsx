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
  
  const cargos = [
    { id: 1, name: "Admin", color: "#ef4444" },
    { id: 2, name: "Editor", color: "#3b82f6" },
    { id: 3, name: "Leitor", color: "#10b981" },
    { id: 4, name: "Moderador", color: "#f59e0b" },
  ];
  
  const usuarios = [
    {
      id: 1,
      username: "carlos_dev",
      cargos: ["Admin", "Editor"],
    },
    {
      id: 2,
      username: "rogerinho",
      cargos: ["Moderador"],
    },
    {
      id: 3,
      username: "xyah",
      cargos: ["Leitor", "Editor"],
    },
  ];
  
  function Usuarios() {
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
            />
            <input
              type="text"
              placeholder="Cargos"
              className="w-full sm:w-60 px-4 py-2 rounded-lg border border-slate-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-sm">
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
                <TableHead className="text-right text-slate-600">Ações</TableHead>
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
                    {user.username}
                  </TableCell>
                  <TableCell>
                    <ul className="flex flex-wrap gap-2 text-sm text-slate-600">
                      {user.cargos.map((cargoName, i) => {
                        const cargoInfo = cargos.find((c) => c.name === cargoName);
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
                            {cargoName}
                          </li>
                        );
                      })}
                    </ul>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex gap-1 text-blue-600 border-blue-600 hover:bg-blue-50"
                      >
                        <Pencil size={16} />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex gap-1 text-red-600 border-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                        Excluir
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
  
  export default Usuarios;
  