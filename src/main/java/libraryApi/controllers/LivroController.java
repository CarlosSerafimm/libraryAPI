package libraryApi.controllers;

import jakarta.validation.Valid;
import libraryApi.controllers.dto.ErroResposta;
import libraryApi.controllers.dto.RequestLivroDTO;
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
            //enviar para service para validar e salvar
            //criar url
            //retornar created com header com location
            //campo obrigatorio
            //conflito isbn

            return ResponseEntity.created(uri).build();
        }catch (RegistroDuplicadoException e){
            ErroResposta conflito = ErroResposta.conflito(e.getMessage());
            return ResponseEntity.status(conflito.status()).body(conflito);
        }
    }
}
