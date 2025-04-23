package libraryApi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class NaoModificavelException extends RuntimeException {
    public NaoModificavelException(String mensagem) {
        super(mensagem);
    }
}