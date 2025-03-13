package libraryApi.repository;

import libraryApi.model.Autor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AutorRepository extends JpaRepository<Autor, Integer> {

    List<Autor> findByNomeContainingIgnoreCase(String nome);
    List<Autor> findByNacionalidadeContainingIgnoreCase(String nacionalidade);
    List<Autor> findByNomeContainingIgnoreCaseAndNacionalidadeContainingIgnoreCase(String nome, String nacionalidade);

}
