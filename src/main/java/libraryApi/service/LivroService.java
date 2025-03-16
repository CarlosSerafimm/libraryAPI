package libraryApi.service;

import libraryApi.model.Livro;
import libraryApi.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    public Livro salvar(Livro livro) {
        return livroRepository.save(livro);
    }

    public Optional<Livro> obterPorId(Integer id){
        return livroRepository.findById(id);
    }
    public void deletar(Integer id){
        livroRepository.deleteById(id);
    }
}
