package libraryApi.repository;

import libraryApi.model.Autor;
import libraryApi.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LivroRepository extends JpaRepository<Livro, Integer> {



    List<Livro> findByTituloContainingIgnoreCase(String titulo);
    List<Livro> findByAutor(Autor autor);
    boolean existsByAutor(Autor autor);
}
