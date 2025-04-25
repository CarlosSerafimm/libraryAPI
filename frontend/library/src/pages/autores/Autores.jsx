import api from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash, Search, CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";

function Autores() {
  const [autores, setAutores] = useState([]);
  const [nome, setNome] = useState("");
  const [nacionalidade, setNacionalidade] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [autorSelecionado, setAutorSelecionado] = useState(null);
  const [editNome, setEditNome] = useState("");
  const [editNacionalidade, setEditNacionalidade] = useState("");
  const [editDataNascimento, setEditDataNascimento] = useState(null);



  const aplicarFiltro = async () => {
    const params = [];

    if (nome !== null && nome !== "") {
      params.push(`nome=${nome}`);
    }
    if (nacionalidade !== null && nacionalidade !== "") {
      params.push(`nacionalidade=${nacionalidade}`);
    }

    const queryString = params.length > 0 ? `?${params.join("&")}` : "";
    await fetchAutores(queryString);

    setNome("");
    setNacionalidade("");
  };

  useEffect(() => {
    fetchAutores();
  }, []);

  const fetchAutores = async (query = "") => {
    try {
      const res = await api.get(`/autores${query}`);
      const dados = res.data.map((autor) => ({
        id: autor.id,
        nome: autor.nome,
        dataNascimento: autor.dataNascimento,
        nacionalidade: autor.nacionalidade,
      }));

      setAutores(dados);
    } catch (err) {
      console.error("Erro ao buscar autores:", err);
    }
  };
  const handleDeleteAutor = async (autor) => {
    const confirm = window.confirm(`Deseja excluir o autor "${autor.nome}"?`);
    if (!confirm) return;

    if (!autor.id) {
      console.warn("ID do autor indefinido, não é possível excluir.");
      return;
    }

    try {
      await api.delete(`/autores/${autor.id}`);
      fetchAutores();
    } catch (err) {
      console.error("Erro ao excluir autor:", err);
      alert("Erro ao excluir autor.");
    }
  };

  const abrirDialogEdicao = (autor) => {
    setAutorSelecionado(autor);
    setEditNome(autor.nome);
    setEditNacionalidade(autor.nacionalidade);
    setEditDataNascimento(new Date(autor.dataNascimento));
    setEditDialogOpen(true);
  };

  const salvarEdicao = async () => {
    try {
      await api.put(`/autores/${autorSelecionado.id}`, {
        nome: editNome,
        nacionalidade: editNacionalidade,
        dataNascimento: editDataNascimento?.toISOString().split("T")[0],
      });
      fetchAutores();
      setEditDialogOpen(false);
    } catch (err) {
      console.error("Erro ao editar autor:", err);
      alert("Erro ao salvar autor.");
    }
  };
  

  return (
    <motion.div
      className="p-6 max-w-6xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h1
        className="text-4xl font-bold tracking-tight text-slate-800"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        Autores
      </motion.h1>

      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            placeholder="Nome"
            className="w-full sm:w-60 px-4 py-2 rounded-xl border border-slate-300 bg-white shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            placeholder="Nacionalidade"
            className="w-full sm:w-60 px-4 py-2 rounded-xl border border-slate-300 bg-white shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={nacionalidade}
            onChange={(e) => setNacionalidade(e.target.value)}
          />
        </div>

        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-lg transition-all"
          onClick={aplicarFiltro}
        >
          <Search className="mr-2 h-4 w-4" />
          Buscar
        </Button>
      </motion.div>

      <motion.div
        className="rounded-2xl border bg-white shadow-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Table>
          <TableHeader className="bg-slate-100">
            <TableRow>
              <TableHead className="text-slate-600 text-sm">Nome</TableHead>
              <TableHead className="text-slate-600 text-sm">
                Data de Nascimento
              </TableHead>
              <TableHead className="text-slate-600 text-sm">
                Nacionalidade
              </TableHead>
              <TableHead className="text-right text-slate-600 text-sm">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {autores.map((autor, index) => (
              <TableRow
                key={index}
                className="hover:bg-slate-50 transition-colors"
              >
                <TableCell>
                  <span className="font-medium text-slate-800">
                    {autor.nome}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-slate-700">{autor.dataNascimento}</span>
                </TableCell>
                <TableCell>
                  <span className="text-slate-700">{autor.nacionalidade}</span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-amber-500 text-amber-600 hover:bg-amber-50 transition-all"
                      onClick={() => abrirDialogEdicao(autor)}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-red-500 text-red-600 hover:bg-red-50 transition-all"
                      onClick={() => handleDeleteAutor(autor)}
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </motion.div>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">
              Editar Autor
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-1">
              <Label
                htmlFor="nome"
                className="text-sm font-medium text-slate-700"
              >
                Nome
              </Label>
              <Input
                id="nome"
                placeholder="Nome do autor"
                value={editNome}
                onChange={(e) => setEditNome(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label
                htmlFor="nacionalidade"
                className="text-sm font-medium text-slate-700"
              >
                Nacionalidade
              </Label>
              <Input
                id="nacionalidade"
                placeholder="Nacionalidade"
                value={editNacionalidade}
                onChange={(e) => setEditNacionalidade(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">
                Data de Nascimento
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !editDataNascimento && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {editDataNascimento
                      ? format(editDataNascimento, "dd/MM/yyyy", {
                          locale: ptBR,
                        })
                      : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={editDataNascimento}
                    onSelect={setEditDataNascimento}
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              onClick={salvarEdicao}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full"
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

export default Autores;
