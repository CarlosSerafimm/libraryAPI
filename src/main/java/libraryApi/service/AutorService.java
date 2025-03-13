package libraryApi.service;

import libraryApi.model.Autor;
import libraryApi.repository.AutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AutorService {

    @Autowired
    private AutorRepository autorRepository;

    public Autor salvar(Autor autor){
        
        return autorRepository.save(autor);
    }

    public void atualizar(Autor autor){

        if (autor.getId() == null){
            throw new IllegalArgumentException("Para atualizar é necessario que o autor já esteja cadastrado!");
        }
        autorRepository.save(autor);
    }

    public Optional<Autor> obterPorId(Integer id){
        return autorRepository.findById(id);
    }

    public void deletar (Autor autor){
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
}
