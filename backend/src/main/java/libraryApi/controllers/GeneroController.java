package libraryApi.controllers;

import libraryApi.model.GeneroLivro;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/generos")
public class GeneroController {

    @GetMapping
//    @PreAuthorize("hasAuthority('genero:search')")
    public ResponseEntity<List<String>> getGeneros() {
        List<String> generos = Arrays.stream(GeneroLivro.values())
                .map(Enum::name)
                .collect(Collectors.toList());
        return ResponseEntity.ok(generos);
    }
}
