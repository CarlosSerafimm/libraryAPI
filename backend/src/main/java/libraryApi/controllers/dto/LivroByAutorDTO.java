package libraryApi.controllers.dto;

import libraryApi.model.GeneroLivro;

import java.math.BigDecimal;
import java.time.LocalDate;

public record LivroByAutorDTO(
        Integer id,
        String isbn,
        String titulo,
        LocalDate dataPublicacao,
        GeneroLivro genero,
        BigDecimal preco) {
}
