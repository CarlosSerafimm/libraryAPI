package libraryApi.service;

import libraryApi.exceptions.OperacaoNaoPermitidaException;
import libraryApi.model.Autor;
import libraryApi.repository.AutorRepository;
import libraryApi.repository.LivroRepository;
import libraryApi.validator.AutorValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AutorService {

    @Autowired
    private AutorRepository autorRepository;
    @Autowired
    private AutorValidator autorValidator;
    @Autowired
    private LivroRepository livroRepository;

    public Autor salvar(Autor autor){
        autorValidator.validar(autor);
        return autorRepository.save(autor);
    }

    public void atualizar(Autor autor){

        if (autor.getId() == null){
            throw new IllegalArgumentException("Para atualizar é necessario que o autor já esteja cadastrado!");
        }
        autorValidator.validar(autor);
        autorRepository.save(autor);
    }

    public Optional<Autor> obterPorId(Integer id){
        return autorRepository.findById(id);
    }

    public void deletar (Autor autor){
        if (possuiLivro(autor)){
            throw new OperacaoNaoPermitidaException("Não é permitido excluir um autor que possui livros cadastrados!");
        }
        autorRepository.delete(autor);
    }
    public List<Autor> pesquisaFiltrada(String nome, String nacionalidade){


        if (nome != null && nome.isEmpty()) nome = null;
        if (nacionalidade != null && nacionalidade.isEmpty()) nacionalidade = null;

        if (nome != null && nacionalidade != null){
            return autorRepository.findByNomeContainingIgnoreCaseAndNacionalidadeContainingIgnoreCase(nome, nacionalidade);
        }
        if (nome != null){
            return autorRepository.findByNomeContainingIgnoreCase(nome);
        }
        if (nacionalidade != null){

        return autorRepository.findByNacionalidadeContainingIgnoreCase(nacionalidade);
        }
        return autorRepository.findAll();
    }
    public boolean possuiLivro(Autor autor){
        return livroRepository.existsByAutor(autor);
    }
}
