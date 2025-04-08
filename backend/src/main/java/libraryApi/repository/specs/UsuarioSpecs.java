package libraryApi.repository.specs;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import libraryApi.model.Role;
import libraryApi.model.Usuario;

import org.springframework.data.jpa.domain.Specification;

public class UsuarioSpecs {
    public static Specification<Usuario> loginLike(String login) {
        return (root, query, cb) ->
                cb.like(cb.lower(root.get("login")), "%" + login.toLowerCase() + "%");
    }

    public static Specification<Usuario> hasRoleName(String roleName) {
        return (root, query, cb) -> {
            Join<Usuario, Role> roles = root.join("roles", JoinType.INNER);
            return cb.equal(cb.lower(roles.get("roleName")), roleName.toLowerCase());
        };
    }
}