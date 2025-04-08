package libraryApi.service;

import libraryApi.model.GeneroLivro;
import libraryApi.model.Livro;
import libraryApi.model.Usuario;
import libraryApi.repository.LivroRepository;
import libraryApi.repository.specs.LivroSpecs;
import libraryApi.security.SecurityService;
import libraryApi.validator.LivroValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;
    @Autowired
    private LivroValidator livroValidator;
    @Autowired
    private SecurityService securityService;

    public Livro salvar(Livro livro) {
        livroValidator.validar(livro);
        Usuario usuario = securityService.obterUsuarioLogado();
        livro.setUsuario(usuario);
        return livroRepository.save(livro);
    }

    public Optional<Livro> obterPorId(Integer id){
        return livroRepository.findById(id);
    }
    public void deletar(Integer id){
        livroRepository.deleteById(id);
    }

    //Query Params: isbn, titulo, nome autor, genero, ano de publicação

    public Page<Livro> pesquisa(String isbn, String titulo, String nomeAutor, GeneroLivro genero, Integer anoPublicacao, Integer pagina, Integer tamanhoPagina){


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

        Pageable pageRequest = PageRequest.of(pagina,tamanhoPagina);

        return livroRepository.findAll(specs, pageRequest);
    }

    public void atualizar(Livro livro) {
        if (livro.getId() == null){
            throw new IllegalArgumentException("Para atualizar é necessario que o livro já esteja cadastrado!");
        }
        livroValidator.validar(livro);
        livroRepository.save(livro);
    }

}
