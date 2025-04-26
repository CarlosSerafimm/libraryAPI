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
import {
  Trash,
  Search,
  CirclePlus,
  Pencil,
  UserIcon,
  GlobeIcon,
  CalendarIcon,
  BookIcon,
} from "lucide-react";
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

function Autores() {
  const [autores, setAutores] = useState([]);
  const [nome, setNome] = useState("");
  const [nacionalidade, setNacionalidade] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [autorSelecionado, setAutorSelecionado] = useState(null);
  const [selectNome, setSelectNome] = useState("");
  const [selectNacionalidade, setSelectNacionalidade] = useState("");
  const [selectDataNascimento, setSelectDataNascimento] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [detalhesDialogOpen, setDetalhesDialogOpen] = useState(false);
  const [autorDetalhado, setAutorDetalhado] = useState(null);

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

  const abrirAutor = async (autor) => {
    console.log("abrindo autor:", autor);

    try {
      const res = await api.get(`/autores/${autor.id}`);
      setAutorDetalhado(res.data);
      setDetalhesDialogOpen(true);
    } catch (err) {
      console.error("Erro ao buscar detalhes do autor:", err);
      alert("Erro ao buscar detalhes do autor.");
    }
  };

  const salvarEdicao = async () => {
    const payload = {
      nome: selectNome,
      nacionalidade: selectNacionalidade,
      dataNascimento: selectDataNascimento?.toISOString().split("T")[0],
    };

    console.log("Payload:", payload);

    try {
      if (isEditing && autorSelecionado.id !== undefined) {
        await api.put(`/autores/${autorSelecionado.id}`, payload);
      } else {
        await api.post(`/autores`, payload);
      }
      fetchAutores();
      setEditDialogOpen(false);
    } catch (err) {
      console.error("Erro ao editar autor:", err);
      alert("Erro ao salvar autor.");
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
    setSelectNome(autor.nome);
    setSelectNacionalidade(autor.nacionalidade);
    setSelectDataNascimento(new Date(autor.dataNascimento));
    setIsEditing(true);
    setEditDialogOpen(true);
  };

  const abrirDialogCriacao = () => {
    setAutorSelecionado(null);
    setSelectNome("");
    setSelectNacionalidade("");
    setSelectDataNascimento(null);
    setIsEditing(false);
    setEditDialogOpen(true);
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
        <div className="gap-3 flex items-center justify-end w-full sm:w-auto">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-lg transition-all"
            onClick={aplicarFiltro}
          >
            <Search className="mr-2 h-4 w-4" />
            Buscar
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-lg transition-all"
            onClick={abrirDialogCriacao}
          >
            <CirclePlus className="mr-2 h-4 w-4" />
            Criar novo Autor
          </Button>
        </div>
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
                className="hover:bg-slate-50 transition-colors cursor-pointer"
                
              >
                <TableCell onClick={() => abrirAutor(autor)}>
                  <span className="font-medium text-slate-800">
                    {autor.nome}
                  </span>
                </TableCell>
                <TableCell onClick={() => abrirAutor(autor)}>
                  <span className="text-slate-700">{autor.dataNascimento}</span>
                </TableCell>
                <TableCell onClick={() => abrirAutor(autor)}>
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

      <Dialog
        open={editDialogOpen}
        onOpenChange={(open) => setEditDialogOpen(open)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-800">
              {isEditing ? "Editar autor" : "Criar autor"}
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
                value={selectNome}
                onChange={(e) => setSelectNome(e.target.value)}
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
                value={selectNacionalidade}
                onChange={(e) => setSelectNacionalidade(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <Label className="text-sm font-medium text-slate-700">
                Data de Nascimento
              </Label>
              <Input
                type="date"
                value={
                  selectDataNascimento
                    ? selectDataNascimento.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setSelectDataNascimento(new Date(e.target.value))
                }
              />
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

      <Dialog open={detalhesDialogOpen} onOpenChange={setDetalhesDialogOpen}>
        <DialogContent className="max-w-3xl p-6 rounded-2xl shadow-lg border border-slate-200 overflow-y-auto max-h-[80vh]">
          {autorDetalhado && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                  <UserIcon className="w-6 h-6 text-slate-700" />
                  {autorDetalhado.nome}
                </DialogTitle>
                <p className="text-slate-500 text-sm">
                  Detalhes completos do autor
                </p>
              </DialogHeader>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <GlobeIcon className="w-4 h-4 text-slate-500" />
                  <span>
                    <strong>Nacionalidade:</strong>{" "}
                    {autorDetalhado.nacionalidade}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-slate-500" />
                  <span>
                    <strong>Data de Nascimento:</strong>{" "}
                    {autorDetalhado.dataNascimento}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2 flex items-center gap-2">
                  <BookIcon className="w-5 h-5 text-slate-700" />
                  Livros Publicados
                </h3>

                {autorDetalhado.livros.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-y-auto max-h-[300px]">
                    {autorDetalhado.livros.map((livro) => (
                      <div
                        key={livro.id}
                        className="p-4 rounded-lg border border-slate-200 hover:shadow transition"
                      >
                        <p className="text-base font-medium text-slate-800">
                          {livro.titulo}
                        </p>
                        <p className="text-sm text-slate-600">
                          ISBN: <span className="font-mono">{livro.isbn}</span>{" "}
                          | Gênero: {livro.genero}
                        </p>
                        <p className="text-sm text-slate-600">
                          Publicado em: {livro.dataPublicacao} | Preço: R${" "}
                          {livro.preco}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm">
                    Este autor ainda não possui livros cadastrados.
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

export default Autores;
