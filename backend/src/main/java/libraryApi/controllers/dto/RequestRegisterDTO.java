package libraryApi.controllers.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record RequestRegisterDTO(

        @NotBlank(message = "Campo obrigatorio")
        String login,
        @NotBlank(message = "Campo obrigatorio")
        String senha

) {


}
