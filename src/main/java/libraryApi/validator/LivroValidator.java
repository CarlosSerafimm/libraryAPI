package libraryApi.validator;

import libraryApi.exceptions.RegistroDuplicadoException;
import libraryApi.model.Livro;
import libraryApi.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class LivroValidator {

    @Autowired
    private LivroRepository livroRepository;

    public void validar (Livro livro){
        if (existeLivroComIsbn(livro)){
            throw new RegistroDuplicadoException("ISBN já cadastrado");
        }
    }

    private boolean existeLivroComIsbn(Livro livro){
        Optional<Livro> livroEncontrado = livroRepository.findByIsbn(livro.getIsbn());

        if (livro.getId()==null){
            return  livroEncontrado.isPresent();
        }
        return livroEncontrado
                .map(Livro::getId)
                .stream()
                .anyMatch(id -> !id.equals(livro.getId()));
    }

}
