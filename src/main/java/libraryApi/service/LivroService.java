package libraryApi.service;

import libraryApi.model.GeneroLivro;
import libraryApi.model.Livro;
import libraryApi.repository.LivroRepository;
import libraryApi.repository.specs.LivroSpecs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
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

    //Query Params: isbn, titulo, nome autor, genero, ano de publicação

    public List<Livro> pesquisa(String isbn,String titulo, String nomeAutor, GeneroLivro genero, Integer anoPublicacao){


        System.out.println(isbn);
        System.out.println(titulo);
        System.out.println(nomeAutor);
        System.out.println(genero);
        System.out.println(anoPublicacao);
        System.out.println();
        System.out.println();

        Specification<Livro> specs = Specification.where((root, query, criteriaBuilder) -> criteriaBuilder.conjunction());
        if (isbn!= null){
            specs = specs.and(LivroSpecs.isbnEqual(isbn));
        }
        if (titulo != null){
            specs = specs.and(LivroSpecs.tituloLike(titulo));
        }
        if (genero != null){
            specs = specs.and(LivroSpecs.generoEqual(genero));
        }

        if (anoPublicacao != null){
            specs = specs.and(LivroSpecs.anoPublicacaoEqual(anoPublicacao));
        }

        if (nomeAutor != null){
            specs = specs.and(LivroSpecs.nomeAutorLike(nomeAutor));

        }

        return livroRepository.findAll(specs);
    }
}
