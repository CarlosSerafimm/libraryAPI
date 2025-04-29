import api from "@/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { set } from "date-fns";
import { motion } from "framer-motion";
import { CirclePlus, Pencil, Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";

function Livros() {
  const [generos, setGeneros] = useState([]);
  const [livros, setLivros] = useState([]);
  const [filtroIsbn, setFiltroIsbn] = useState("");
  const [filtroTitulo, setFiltroTitulo] = useState("");
  const [filtroAutorNome, setFiltroAutorNome] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("");
  const [filtroData, setFiltroData] = useState("");
  const [livroSelecionado, setLivroSelecionado] = useState(null);
  const [selectIsbn, setSelectIsbn] = useState("");
  const [selectTitulo, setSelectTitulo] = useState("");
  const [selectAutorId, setSelectAutorId] = useState("");
  const [selectDataPublicacao, setSelectDataPublicacao] = useState(null);
  const [selectGenero, setSelectGenero] = useState("");
  const [selectPreco, setSelectPreco] = useState("");
  const [selectAutorNome, setSelectAutorNome] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [autores, setAutores] = useState([]);

  const aplicarFiltro = async () => {
    const params = [];

    if (filtroIsbn !== null && filtroIsbn !== "") {
      params.push(`isbn=${filtroIsbn}`);
    }
    if (filtroTitulo !== null && filtroTitulo !== "") {
      params.push(`titulo=${filtroTitulo}`);
    }
    if (filtroAutorNome !== null && filtroAutorNome !== "") {
      params.push(`nomeAutor=${filtroAutorNome}`);
    }
    if (filtroGenero !== null && filtroGenero !== "") {
      params.push(`genero=${filtroGenero}`);
    }
    if (filtroData !== null && filtroData !== "") {
      params.push(`anoPublicacao=${filtroData}`);
    }

    const queryString = params.length > 0 ? `?${params.join("&")}` : "";
    await getLivros(queryString);
  };

  useEffect(() => {
    getGenero();
    getLivros();
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

  const salvarEdicao = async () => {
    const payload = {
      isbn: selectIsbn,
      titulo: selectTitulo,
      dataPublicacao: selectDataPublicacao?.toISOString().split("T")[0],
      genero: selectGenero,
      preco: selectPreco,
      idAutor: selectAutorId,
    };

    try {
      if (isEditing && livroSelecionado.id !== undefined) {
        await api.put(`/livros/${livroSelecionado.id}`, payload);
      }
      else {
        await api.post(`/livros`, payload);
      }
      getLivros();
      setEditDialogOpen(false);
    } catch (err) {
      console.error("Erro ao salvar alterções:", err);
      alert("Erro ao salvar alterções.");
    }
  };

  const getLivros = async (query = "") => {
    try {
      const res = await api.get(`/livros/${query}`);
      const data = res.data.content.map((livro) => ({
        id: livro.id,
        isbn: livro.isbn,
        titulo: livro.titulo,
        autor: livro.autor.nome,
        autorId: livro.autor.id,
        dataPublicacao: livro.dataPublicacao,
        genero: livro.genero,
        preco: livro.preco,
      }));

      setLivros(data);
    } catch (err) {
      console.error("Erro ao buscar livros:", err);
    }
  };

  const getGenero = async () => {
    try {
      const res = await api.get("/generos");
      setGeneros(res.data);
    } catch (err) {
      console.error("Erro ao buscar roles:", err);
    }
  };

  const handleDeleteLivro = async (livro) => {
    const confirm = window.confirm(`Deseja excluir o livro "${livro.titulo}"?`);
    if (!confirm) return;

    if (!livro.id) {
      console.warn("ID do livro indefinido, não é possível excluir.");
      return;
    }

    try {
      await api.delete(`/livros/${livro.id}`);
      getLivros();
    } catch (err) {
      console.error("Erro ao excluir livro:", err);
      alert("Erro ao excluir livro.");
    }
  };

  const abrirDialogEdicao = (livro) => {
    setLivroSelecionado(livro);
    setSelectIsbn(livro.isbn);
    setSelectTitulo(livro.titulo);
    setSelectAutorId(livro.autorId);
    setSelectAutorNome(livro.autor);
    setSelectDataPublicacao(new Date(livro.dataPublicacao));
    setSelectPreco(livro.preco);
    setSelectGenero(livro.genero);
    setIsEditing(true);
    setEditDialogOpen(true);
  };
  const abrirDialogCriacao = () => {
    setLivroSelecionado(null);
    setSelectIsbn("");
    setSelectTitulo("");
    setSelectAutorId("");
    setSelectAutorNome("");
    setSelectDataPublicacao(null);
    setSelectPreco("");
    setSelectGenero("livro.genero");
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
        Livros
      </motion.h1>

      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex flex-col gap-3 w-full ">
          <div className="gap-3 flex items-center justify-start w-full sm:w-auto">
            <input
              placeholder="isbn exato"
              className="w-full sm:w-60 px-4 py-2 rounded-xl border border-slate-300 bg-white shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filtroIsbn}
              onChange={(e) => setFiltroIsbn(e.target.value)}
            />
            <input
              placeholder="titulo"
              className="w-full sm:w-60 px-4 py-2 rounded-xl border border-slate-300 bg-white shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filtroTitulo}
              onChange={(e) => setFiltroTitulo(e.target.value)}
            />
            <input
              placeholder="nome do autor"
              className="w-full sm:w-60 px-4 py-2 rounded-xl border border-slate-300 bg-white shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filtroAutorNome}
              onChange={(e) => setFiltroAutorNome(e.target.value)}
            />
          </div>

          <div className="flex gap-3 items-start sm:items-center justify-between w-full sm:w-auto">
            <div className="flex gap-3 items-start sm:items-center justify-between w-full sm:w-auto">
              <Select
                value={filtroGenero}
                onValueChange={(value) =>
                  setFiltroGenero(value === "todos" ? "" : value)
                }
              >
                <SelectTrigger className="w-full sm:w-60 bg-white border border-slate-300 shadow-md rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 hover:border-blue-300 transition duration-300 ease-in-out">
                  <SelectValue
                    placeholder="Selecione um gênero"
                    className="text-slate-600 font-semibold"
                  />
                </SelectTrigger>

                <SelectContent className="bg-white rounded-lg shadow-lg border border-slate-200 mt-2 py-2 overflow-hidden max-h-60 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                  <SelectItem value="todos">
                    <div className="flex items-center gap-2 text-slate-700 hover:bg-blue-50 rounded-lg px-4 py-2 transition duration-200">
                      Todos os gêneros
                    </div>
                  </SelectItem>

                  {generos.map((genero) => (
                    <SelectItem key={genero} value={genero}>
                      <div className="flex items-center gap-2 text-slate-700 hover:bg-blue-50 rounded-lg px-4 py-2 transition duration-200">
                        {genero}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="date"
                className="w-full sm:w-60 px-4 py-2 rounded-xl border border-slate-300 bg-white shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filtroData}
                onChange={(e) => setFiltroData(e.target.value)}
                aria-label="Selecione uma data"
              />
            </div>
            <div className="flex gap-3 items-start sm:items-center justify-between w-full sm:w-auto">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-lg transition-all"
                // onClick={aplicarFiltro}
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
                Criar novo Livro
              </Button>
            </div>
          </div>
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
              <TableHead className="text-slate-600 text-sm">ISBN</TableHead>
              <TableHead className="text-slate-600 text-sm">Titulo</TableHead>
              <TableHead className="text-slate-600 text-sm">
                Data de publicação
              </TableHead>
              <TableHead className="text-slate-600 text-sm">Genero</TableHead>
              <TableHead className="text-slate-600 text-sm">Preço</TableHead>
              <TableHead className="text-slate-600 text-sm">Autor</TableHead>
              <TableHead className="text-right text-slate-600 text-sm">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {livros.map((livro) => (
              <TableRow
                key={livro.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <TableCell>
                  <span className="font-medium text-slate-800">
                    {livro.isbn}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-slate-800">
                    {livro.titulo}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-slate-800">
                    {livro.dataPublicacao}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-slate-800">
                    {livro.genero}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-slate-800">
                    R$ {livro.preco}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-medium text-slate-800">
                    {livro.autor}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-amber-500 text-amber-600 hover:bg-amber-50 transition-all"
                      onClick={() => abrirDialogEdicao(livro)}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-red-500 text-red-600 hover:bg-red-50 transition-all"
                      onClick={() => handleDeleteLivro(livro)}
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
        <DialogContent className="w-full max-w-lg rounded-2xl p-6 bg-white shadow-2xl border border-slate-200">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold text-slate-800 text-center">
              {isEditing ? "Editar Livro" : "Criar Livro"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label
                htmlFor="isbn"
                className="text-sm font-medium text-slate-600"
              >
                ISBN
              </Label>
              <Input
                id="isbn"
                placeholder="Digite o ISBN"
                value={selectIsbn}
                onChange={(e) => setSelectIsbn(e.target.value)}
                className="w-full rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid gap-1">
              <Label
                htmlFor="titulo"
                className="text-sm font-medium text-slate-600"
              >
                Título
              </Label>
              <Input
                id="titulo"
                placeholder="Digite o título"
                value={selectTitulo}
                onChange={(e) => setSelectTitulo(e.target.value)}
                className="w-full rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid gap-1">
              <Label className="text-sm font-medium text-slate-600">
                Autor
              </Label>
              <Select
                value={selectAutorId}
                onValueChange={(id) => {
                  setSelectAutorId(id);
                  const autor = autores.find((a) => a.id.toString() === id);
                  setSelectAutorNome(autor ? autor.nome : "");
                }}
              >
                <SelectTrigger className="w-full rounded-lg bg-white border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition">
                  <SelectValue placeholder="Selecione um autor">
                    {selectAutorNome || "Selecione um autor"}
                  </SelectValue>
                </SelectTrigger>

                <SelectContent className="bg-white rounded-lg shadow-md border border-slate-200 mt-2 py-2 max-h-60 overflow-y-auto">
                  {autores.map((autor) => (
                    <SelectItem key={autor.id} value={autor.id.toString()}>
                      <div className="flex items-center gap-2 text-slate-700 hover:bg-blue-50 rounded-md px-4 py-2 transition">
                        {autor.nome}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1">
              <Label className="text-sm font-medium text-slate-600">
                Gênero
              </Label>
              <Select
                value={selectGenero}
                onValueChange={(value) =>
                  setSelectGenero(value === "todos" ? "" : value)
                }
              >
                <SelectTrigger className="w-full rounded-lg bg-white border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 hover:border-blue-400 transition">
                  <SelectValue placeholder="Selecione um gênero" />
                </SelectTrigger>

                <SelectContent className="bg-white rounded-lg shadow-md border border-slate-200 mt-2 py-2 max-h-60 overflow-y-auto">
                  <SelectItem value="todos">
                    <div className="flex items-center gap-2 text-slate-700 hover:bg-blue-50 rounded-md px-4 py-2 transition">
                      Todos os gêneros
                    </div>
                  </SelectItem>

                  {generos.map((genero) => (
                    <SelectItem key={genero} value={genero}>
                      <div className="flex items-center gap-2 text-slate-700 hover:bg-blue-50 rounded-md px-4 py-2 transition">
                        {genero}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1">
              <Label className="text-sm font-medium text-slate-600">
                Data de Publicação
              </Label>
              <Input
                type="date"
                value={
                  selectDataPublicacao
                    ? selectDataPublicacao.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setSelectDataPublicacao(new Date(e.target.value))
                }
                className="w-full rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid gap-1">
              <Label
                htmlFor="preco"
                className="text-sm font-medium text-slate-600"
              >
                Preço
              </Label>
              <Input
                id="preco"
                placeholder="Digite o preço"
                value={selectPreco}
                onChange={(e) => setSelectPreco(e.target.value)}
                className="w-full rounded-lg border-slate-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              onClick={salvarEdicao}
              className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 transition"
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

export default Livros;
