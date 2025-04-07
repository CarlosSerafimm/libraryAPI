package libraryApi.repository;

import libraryApi.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    Role findByRoleName(String roleName);

    List<Role> findByRoleNameIn(List<String> roleNames);
}
