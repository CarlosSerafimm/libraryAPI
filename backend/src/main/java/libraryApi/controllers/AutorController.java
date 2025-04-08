package libraryApi.controllers;


import jakarta.validation.Valid;
import libraryApi.controllers.dto.AutorDTO;
import libraryApi.controllers.mappers.AutorMapper;
import libraryApi.model.Autor;
import libraryApi.service.AutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/autores")
public class AutorController implements GenericController {

    @Autowired
    private AutorService autorService;
    @Autowired
    private AutorMapper autorMapper;


    @PostMapping
    @PreAuthorize("hasAuthority('autor:create')")
    public ResponseEntity<Object> salvar(@RequestBody @Valid AutorDTO dto) {




        Autor autor = autorMapper.toEntity(dto);



        autorService.salvar(autor);

        URI uri = gerarHeaderLocation(autor.getId());

        return ResponseEntity.created(uri).build();

    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('autor:read')")
    public ResponseEntity<AutorDTO> obterDetalhes(@PathVariable Integer id) {

        Optional<Autor> autorOptional = autorService.obterPorId(id);

        return autorService.obterPorId(id).map(autor -> {
            AutorDTO dto = autorMapper.toDTO(autor);
            return ResponseEntity.ok(dto);
        }).orElseGet(() -> {
            return ResponseEntity.notFound().build();
        });

//        if (autorOptional.isPresent()){
//
//            Autor autor = autorOptional.get();
//            AutorDTO dto = autorMapper.toDTO(autor);
//            return ResponseEntity.ok(dto);
//        }
//        return ResponseEntity.notFound().build();
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('autor:delete')")
    public ResponseEntity<Object> deletar(@PathVariable Integer id) {


        Optional<Autor> autorOptional = autorService.obterPorId(id);

        if (autorOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        autorService.deletar(autorOptional.get());
        return ResponseEntity.noContent().build();

    }

    @GetMapping
    @PreAuthorize("hasAuthority('autor:search')")
    public ResponseEntity<List<AutorDTO>> pesquisar(@RequestParam(value = "nome", required = false) String nome, @RequestParam(value = "nacionalidade", required = false) String nacionalidade) {

        List<Autor> resultado = autorService.buscaByExample(nome, nacionalidade);

        List<AutorDTO> lista = resultado.stream().map(autorMapper::toDTO).collect(Collectors.toList());

        return ResponseEntity.ok(lista);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('autor:update')")
    public ResponseEntity<Object> atualizar(@PathVariable("id") Integer id, @RequestBody @Valid AutorDTO dto) {


        Optional<Autor> autorOptional = autorService.obterPorId(id);

        if (autorOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Autor autor = autorOptional.get();
        autor.setNome(dto.nome());
        autor.setNacionalidade(dto.nacionalidade());
        autor.setDataNascimento(dto.dataNascimento());

        autorService.atualizar(autor);
        return ResponseEntity.noContent().build();

    }
}
