package libraryApi.repository;

import libraryApi.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Role findByRoleName(String roleName);

    List<Role> findByRoleNameIn(List<String> roleNames);

    Optional<Role> findById(Integer id);

}
