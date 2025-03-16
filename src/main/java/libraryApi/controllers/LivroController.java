package libraryApi.controllers;

import jakarta.validation.Valid;
import libraryApi.controllers.dto.ErroResposta;
import libraryApi.controllers.dto.RequestLivroDTO;
import libraryApi.controllers.dto.ResponseLivroDTO;
import libraryApi.controllers.mappers.LivroMapper;
import libraryApi.exceptions.RegistroDuplicadoException;
import libraryApi.model.Livro;
import libraryApi.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/livros")
public class LivroController implements GenericController{

    @Autowired
    private LivroService livroService;
    @Autowired
    private LivroMapper livroMapper;

    @PostMapping
    public ResponseEntity<Object> salvar(@RequestBody @Valid RequestLivroDTO dto){
        try{

            Livro livro = livroMapper.toEntity(dto);

            livroService.salvar(livro);


            URI uri = gerarHeaderLocation(livro.getId());
            //validar no service
            //conflito isbn

            return ResponseEntity.created(uri).build();
        }catch (RegistroDuplicadoException e){
            ErroResposta conflito = ErroResposta.conflito(e.getMessage());
            return ResponseEntity.status(conflito.status()).body(conflito);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseLivroDTO> obterDetalhes(@PathVariable("id") Integer id){

        return livroService.obterPorId(id)
                .map(livro -> {
                    ResponseLivroDTO dto = livroMapper.toDTO(livro);
                    return ResponseEntity.ok(dto);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletar(@PathVariable("id") Integer id){
        return livroService.obterPorId(id)
                .map(livro -> {
                    livroService.deletar(id);
                    return ResponseEntity.noContent().build();
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
