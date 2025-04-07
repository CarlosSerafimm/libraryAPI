package libraryApi.controllers;

import jakarta.validation.Valid;
import libraryApi.controllers.dto.ErroResposta;
import libraryApi.controllers.dto.RequestLivroDTO;
import libraryApi.controllers.dto.ResponseLivroDTO;
import libraryApi.controllers.mappers.LivroMapper;
import libraryApi.exceptions.RegistroDuplicadoException;
import libraryApi.model.GeneroLivro;
import libraryApi.model.Livro;
import libraryApi.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/livros")
public class LivroController implements GenericController {

    @Autowired
    private LivroService livroService;
    @Autowired
    private LivroMapper livroMapper;

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> salvar(@RequestBody @Valid RequestLivroDTO dto) {
        try {

            Livro livro = livroMapper.toEntity(dto);
            livroService.salvar(livro);

            URI uri = gerarHeaderLocation(livro.getId());

            return ResponseEntity.created(uri).build();
        } catch (RegistroDuplicadoException e) {
            ErroResposta conflito = ErroResposta.conflito(e.getMessage());
            return ResponseEntity.status(conflito.status()).body(conflito);
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResponseLivroDTO> obterDetalhes(@PathVariable("id") Integer id) {

        return livroService.obterPorId(id).map(livro -> {
            ResponseLivroDTO dto = livroMapper.toDTO(livro);
            return ResponseEntity.ok(dto);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> deletar(@PathVariable("id") Integer id) {
        return livroService.obterPorId(id).map(livro -> {
            livroService.deletar(id);
            return ResponseEntity.noContent().build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<Page<ResponseLivroDTO>> pesquisa(
            @RequestParam(value = "isbn", required = false) String isbn,
            @RequestParam(value = "titulo", required = false) String titulo,
            @RequestParam(value = "nomeAutor", required = false) String nomeAutor,
            @RequestParam(value = "genero", required = false) GeneroLivro genero,
            @RequestParam(value = "anoPublicacao", required = false) Integer anoPublicacao,
            @RequestParam(value = "pagina", defaultValue = "0") Integer pagina,
            @RequestParam(value = "tamanhoPagina", defaultValue = "10") Integer tamanhoPagina) {

        //busca paginada

        Page<Livro> pesquisa = livroService.pesquisa(isbn, titulo, nomeAutor, genero, anoPublicacao, pagina, tamanhoPagina);

        Page<ResponseLivroDTO> resultado = pesquisa.map(livroMapper::toDTO);


        return ResponseEntity.ok(resultado);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Object> atualizar(@PathVariable Integer id, @RequestBody @Valid RequestLivroDTO dto) {
        return livroService.obterPorId(id).map(livro -> {
            Livro entityAux = livroMapper.toEntity(dto);

            livro.setDataPublicacao(entityAux.getDataPublicacao());
            livro.setPreco(entityAux.getPreco());
            livro.setIsbn(entityAux.getIsbn());
            livro.setGenero(entityAux.getGenero());
            livro.setTitulo(entityAux.getTitulo());
            livro.setAutor(entityAux.getAutor());

            livroService.atualizar(livro);
            return ResponseEntity.noContent().build();

        }).orElseGet(() -> ResponseEntity.notFound().build());
    }


}

