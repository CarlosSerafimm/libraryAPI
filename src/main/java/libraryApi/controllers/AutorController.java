package libraryApi.controllers;



import libraryApi.controllers.dto.AutorDTO;
import libraryApi.controllers.dto.ErroResposta;
import libraryApi.exceptions.OperacaoNaoPermitidaException;
import libraryApi.exceptions.RegistroDuplicadoException;
import libraryApi.model.Autor;
import libraryApi.service.AutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/autores")
public class AutorController {

    @Autowired
    public AutorService autorService;

    @PostMapping
    public ResponseEntity<Object> salvar(@RequestBody AutorDTO autor){
        try {

            Autor autorEntidade = autor.mapearAutor();
            autorService.salvar(autorEntidade);

            URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(autorEntidade.getId()).toUri();


            return ResponseEntity.created(uri).build();
        }catch (RegistroDuplicadoException e){
            var erroDTO = ErroResposta.conflito(e.getMessage());
            return ResponseEntity.status(erroDTO.status()).body(erroDTO);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<AutorDTO> obterDetalhes(@PathVariable Integer id){

        Optional<Autor> autorOptional = autorService.obterPorId(id);
        if (autorOptional.isPresent()){

            Autor autor = autorOptional.get();
            AutorDTO dto = new AutorDTO(autor.getId(), autor.getNome(), autor.getDataNascimento(), autor.getNacionalidade());
            return ResponseEntity.ok(dto);
        }
        return ResponseEntity.notFound().build();
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deletar(@PathVariable Integer id){

        try {

        Optional<Autor> autorOptional = autorService.obterPorId(id);

        if (autorOptional.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        autorService.deletar(autorOptional.get());
        return ResponseEntity.noContent().build();
        }catch (OperacaoNaoPermitidaException e){
            ErroResposta erroResposta = ErroResposta.respostaPadrao(e.getMessage());
            return ResponseEntity.status(erroResposta.status()).body(erroResposta);
        }
    }

    @GetMapping
    public ResponseEntity<List<AutorDTO>> pesquisar (@RequestParam(value = "nome", required = false) String nome,
                                                     @RequestParam(value = "nacionalidade", required = false) String nacionalidade){

        List<Autor> resultado =  autorService.pesquisaFiltrada(nome, nacionalidade);

        List<AutorDTO> lista = resultado
                .stream()
                .map(autor -> new AutorDTO(
                        autor.getId(),
                        autor.getNome(),
                        autor.getDataNascimento(),
                        autor.getNacionalidade())
                ).collect(Collectors.toList());

        return ResponseEntity.ok(lista);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> atualizar(@PathVariable("id") Integer id, @RequestBody AutorDTO dto){

        try {

        Optional<Autor> autorOptional = autorService.obterPorId(id);

        if (autorOptional.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        Autor autor = autorOptional.get();
        autor.setNome(dto.nome());
        autor.setNacionalidade(dto.nacionalidade());
        autor.setDataNascimento(dto.dataNascimento());

        autorService.atualizar(autor);
        return ResponseEntity.noContent().build();
        }catch (RegistroDuplicadoException e){
            var erroDTO = ErroResposta.conflito(e.getMessage());
            return ResponseEntity.status(erroDTO.status()).body(erroDTO);
        }
    }
}
