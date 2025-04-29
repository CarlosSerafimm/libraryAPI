import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ColorPicker from "@/components/ColorPicker";
import api from "@/api";

function Cargos() {
  const [cargos, setCargos] = useState([]);
  const [allAuthorities, setAllAuthorities] = useState([]);
  const [selectedCargo, setSelectedCargo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchRoles();
    fetchAuthorities();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await api.get("/roles");
      const roles = res.data.map((role) => ({
        id: role.id,
        name: role.roleName,
        color: role.corRgba,
        modificavel: role.modificavel,
        authorities: role.authorities,
      }));
      
      setCargos(roles);
      
    } catch (err) {
      console.error("Erro ao buscar roles:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuthorities = async () => {
    try {
      const res = await api.get("/authority");
      const authorities = res.data.map((a) => a.name);
      setAllAuthorities(authorities);
    } catch (err) {
      console.error("Erro ao buscar authorities:", err);
    }
  };

  const handleSaveChanges = async () => {
    if (!selectedCargo) return;
  
    const payload = {
      roleName: selectedCargo.name,
      corRgba: selectedColor,
      authorities: selectedCargo.authorities,
    };
  
   

  
    try {
      if (isEditing && selectedCargo.id !== undefined) {
        await api.put(`/roles/${selectedCargo.id}`, payload);
      } else {
        const res = await api.post("/roles", payload);
      }
      setDialogOpen(false);
      fetchRoles();
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      alert("Erro ao salvar alterações.");
    }
  };
  

  const handleNameChange = (e) => {
    const updatedName = e.target.value;
    setSelectedCargo((prev) => ({
      ...prev,
      name: updatedName,
    }));
    
  };

  const handleDeleteCargo = async (cargo) => {
    const confirm = window.confirm(`Deseja excluir o cargo "${cargo.name}"?`);
    if (!confirm) return;

    if (!cargo.id) {
      console.warn("ID do cargo indefinido, não é possível excluir.");
      return;
    }

    try {
      await api.delete(`/roles/${cargo.id}`);
      fetchRoles();
    } catch (err) {
      console.error("Erro ao excluir cargo:", err);
      alert("Erro ao excluir cargo.");
    }
  };

  const handleRowClick = (cargo) => {
    setSelectedCargo({ ...cargo });
    setSelectedColor(cargo.color);
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleCreateCargo = () => {
    setSelectedCargo({
      id: undefined,
      name: "",
      color: "rgba(0,0,0,1)",
      authorities: [],
      modificavel: true, 
    });
    setSelectedColor("rgba(0,0,0,1)");
    setIsEditing(false);
    setDialogOpen(true);
  };
  

  const toggleAuthority = (authority) => {
    setSelectedCargo((prev) => {
      const has = prev.authorities.includes(authority);
      return {
        ...prev,
        authorities: has
          ? prev.authorities.filter((a) => a !== authority)
          : [...prev.authorities, authority],
      };
    });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-slate-800 text-center mb-10 tracking-tight">
          Gerenciamento de Cargos
        </h1>
        <div className="flex justify-end mb-4">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-sm"
            onClick={handleCreateCargo}
          >
            Criar novo cargo
          </Button>
        </div>

        <Card className="shadow-xl rounded-2xl border border-slate-200">
          <CardContent className="p-6">
            {loading ? (
              <p className="text-center text-slate-500">Carregando cargos...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-slate-600 text-lg">
                      Nome do Cargo
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cargos.map((cargo) => (
                    <TableRow
                      key={cargo.id}
                      className="hover:bg-slate-100 transition-colors duration-200"
                    >
                      <TableCell className="py-4">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="flex items-center justify-between gap-3"
                        >
                          <div
                            className="flex items-center gap-3 cursor-pointer"
                            onClick={() => handleRowClick(cargo)}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded-full"
                              style={{ backgroundColor: cargo.color }}
                            />
                            <span className="text-slate-800 font-medium text-base">
                              {cargo.name}
                            </span>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteCargo(cargo)}
                          >
                            Excluir
                          </Button>
                        </motion.div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-6 space-y-6">
          {selectedCargo && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold flex items-center gap-3">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: selectedCargo.color }}
                  />
                  <input
                    type="text"
                    value={selectedCargo.name}
                    onChange={handleNameChange}
                    disabled={!selectedCargo.modificavel}
                    className="w-full text-xl font-semibold text-slate-800 bg-transparent border-b border-slate-300 focus:outline-none focus:border-slate-600"
                  />
                </DialogTitle>
              </DialogHeader>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Cor do Cargo
                </label>
                <ColorPicker
                  color={selectedColor}
                  onChange={setSelectedColor}
                />
              </div>

              <div className="border-t pt-4 space-y-2">
                <h3 className="text-lg font-medium text-slate-800 mb-2">
                  Permissões
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {allAuthorities.map((auth) => (
                    <div key={auth} className="flex items-center gap-2">
                      <Checkbox
                        id={auth}
                        checked={selectedCargo.authorities.includes(auth)}
                        onCheckedChange={() => toggleAuthority(auth)}
                        disabled={!selectedCargo.modificavel}
                      />
                      <label htmlFor={auth} className="text-sm text-slate-700">
                        {auth}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full" onClick={handleSaveChanges} disabled={!selectedCargo.modificavel}>
                  Salvar alterações
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Cargos;
