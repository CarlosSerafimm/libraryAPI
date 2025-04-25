package libraryApi.controllers.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.util.List;

public record AutorGetDTO(
        Integer id,
        String nome,
        LocalDate dataNascimento,
        String nacionalidade,
        List<LivroByAutorDTO> livros
) {
}
