package libraryApi.repository.specs;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import libraryApi.model.GeneroLivro;
import libraryApi.model.Livro;
import org.springframework.data.jpa.domain.Specification;

public class LivroSpecs {

    public static Specification<Livro> isbnEqual(String isbn){

        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("isbn"), isbn);
    }
    public static Specification<Livro> tituloLike(String titulo){
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.upper(root.get("titulo") ) ,"%" + titulo.toUpperCase() + "%");
    }

    public static Specification<Livro> generoEqual(GeneroLivro genero){
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("genero") , genero);
    }

    public static Specification<Livro> anoPublicacaoEqual(Integer anoPublicacao){
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(
                        criteriaBuilder.function("YEAR", Integer.class, root.get("dataPublicacao")),
                        anoPublicacao
                );

    }

    public static Specification<Livro> nomeAutorLike(String nome){
        return (root, query, criteriaBuilder) ->{
            return criteriaBuilder.like(criteriaBuilder.upper(root.get("autor").get("nome")), "%"+ nome+ "%".toUpperCase());

        };
    }
}
