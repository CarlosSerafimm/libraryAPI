package libraryApi.config;

import jakarta.annotation.PostConstruct;
import libraryApi.model.Authority;
import libraryApi.model.Role;
import libraryApi.model.Usuario;
import libraryApi.repository.AuthorityRepository;
import libraryApi.repository.RoleRepository;
import libraryApi.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

@Configuration
public class SuperAdminInitializer {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final List<String> AUTHORITIES = List.of(
            // AutorController
            "autor:create", "autor:read", "autor:delete", "autor:search", "autor:update",
            // LivroController
            "livro:create", "livro:read", "livro:delete", "livro:search", "livro:update",
            // RoleController
            "role:create", "role:delete", "role:read",
            // UsuarioController
            "usuario:search", "usuario:addRole", "usuario:removeRole"
    );

    @PostConstruct
    public void init() {
        // 1. Criar Authorities se não existirem
        List<Authority> todasAuthorities = new ArrayList<>();
        for (String authorityName : AUTHORITIES) {
            Authority authority = authorityRepository.findByName(authorityName);
            if (authority == null) {
                authority = new Authority();
                authority.setName(authorityName);
                authorityRepository.save(authority);
            }
            todasAuthorities.add(authority);
        }

        // 2. Criar Role SUPER_ADMIN se não existir
        Role superAdminRole = roleRepository.findByRoleName("SUPER_ADMIN");
        if (superAdminRole == null) {
            superAdminRole = new Role();
            superAdminRole.setRoleName("SUPER_ADMIN");
            superAdminRole.setCorRgba("rgba(255, 33, 57, 1)"); // cor padrão
            superAdminRole.setAuthorities(new HashSet<>(todasAuthorities));
            roleRepository.save(superAdminRole);
            System.out.println("Role SUPER_ADMIN criada com todas as authorities.");
        }

        // 3. Criar Usuário SUPER_ADMIN se não existir
        String login = "SUPER_ADMIN";
        if (usuarioRepository.findByLogin(login) == null) {
            Usuario superAdmin = new Usuario();
            superAdmin.setLogin(login);
            superAdmin.setSenha(passwordEncoder.encode("admin"));
            superAdmin.setRoles(List.of(superAdminRole));
            usuarioRepository.save(superAdmin);
            System.out.println("Usuário SUPER_ADMIN criado com sucesso.");
        } else {
            System.out.println("Usuário SUPER_ADMIN já existe.");
        }
    }
}
