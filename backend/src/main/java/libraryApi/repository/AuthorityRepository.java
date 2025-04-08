package libraryApi.repository;

import libraryApi.model.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface AuthorityRepository extends JpaRepository<Authority, Integer> {
    Authority findByName(String name);
    Set<Authority> findByNameIn(Set<String> names);


}
