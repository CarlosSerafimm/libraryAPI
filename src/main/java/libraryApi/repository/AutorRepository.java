package libraryApi.repository;

import libraryApi.model.Autor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AutorRepository extends JpaRepository<Autor, Integer> {


    @Query("SELECT a FROM Autor a WHERE TRIM(LOWER(a.nome)) = TRIM(LOWER(:nome)) " +
            "AND a.dataNascimento = :dataNascimento " +
            "AND TRIM(LOWER(a.nacionalidade)) = TRIM(LOWER(:nacionalidade))")
    Optional<Autor> findByNomeDataNascimentoNacionalidade(
            @Param("nome") String nome,
            @Param("dataNascimento") LocalDate dataNascimento,
            @Param("nacionalidade") String nacionalidade
    );



}
