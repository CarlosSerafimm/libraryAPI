package libraryApi.validator;

import libraryApi.exceptions.CampoInvalidoException;
import libraryApi.exceptions.RegistroDuplicadoException;
import libraryApi.model.Livro;
import libraryApi.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class LivroValidator {

    private static final int ANO_EXIGENCIA_PRECO = 2020;

    @Autowired
    private LivroRepository livroRepository;

    public void validar (Livro livro){
        if (existeLivroComIsbn(livro)){
            throw new RegistroDuplicadoException("ISBN já cadastrado");
        }

        if (isPrecoObrigatorioNulo(livro)){
            throw new CampoInvalidoException("preço","Para livros publicados depois de 2020 o preço é obrigatório!" );
        }
    }

    private boolean isPrecoObrigatorioNulo(Livro livro) {
        return livro.getPreco() == null && livro.getDataPublicacao().getYear() >= ANO_EXIGENCIA_PRECO;
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
