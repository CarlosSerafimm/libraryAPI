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
public class InitializerConfigurator {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final List<String> AUTHORITIES_USER = List.of(
        //AUTOR
        "autor:create", "autor:search",
        //GENERO
        "genero:search",
        //LIVRO
        "livro:search"

    );
    private static final List<String> AUTHORITIES = List.of(
            //AUTHORITY
            "authority:search",
            //AUTOR
            "autor:create", "autor:read", "autor:delete", "autor:search", "autor:update",
            //GENERO
            "genero:search",
            //LIVRO
            "livro:create", "livro:read", "livro:delete", "livro:search", "livro:update",
            //ROLE
            "role:create", "role:search", "role:delete", "role:update",
            //USUARIO
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

        // 2. Criar lista de authoridades user
        List<Authority> AuthoridadesUser = new ArrayList<>();
        for (String authorityName : AUTHORITIES_USER) {
            Authority authority = authorityRepository.findByName(authorityName);
            if (authority == null) {
                authority = new Authority();
                authority.setName(authorityName);
                authorityRepository.save(authority);
            }
            AuthoridadesUser.add(authority);
        }

        // 3. Criar Role SUPER_ADMIN se não existir
        Role superAdminRole = roleRepository.findByRoleName("SUPER_ADMIN");
        if (superAdminRole == null) {
            superAdminRole = new Role();
            superAdminRole.setRoleName("SUPER_ADMIN");
            superAdminRole.setCorRgba("rgba(255, 33, 57, 1)"); // vermelho
            superAdminRole.setAuthorities(new HashSet<>(todasAuthorities));
            superAdminRole.setModificavel(false);
            roleRepository.save(superAdminRole);
            System.out.println("Role SUPER_ADMIN criada com todas as authorities.");
        }

        // 4. Criar Role USER se não existir
        Role userRole = roleRepository.findByRoleName("USER");
        if (userRole == null) {
            userRole = new Role();
            userRole.setRoleName("USER");
            userRole.setCorRgba("rgba(33, 150, 243, 1)"); // azul
            userRole.setAuthorities(new HashSet<>(AuthoridadesUser)); // Nenhuma authority por padrão
            userRole.setModificavel(false);
            roleRepository.save(userRole);
            System.out.println("Role USER criada.");
        }

        // 5. Criar Usuário SUPER_ADMIN se não existir
        String loginAdmin = "SUPER_ADMIN";
        if (usuarioRepository.findByLogin(loginAdmin) == null) {
            Usuario superAdmin = new Usuario();
            superAdmin.setLogin(loginAdmin);
            superAdmin.setSenha(passwordEncoder.encode("admin"));
            superAdmin.setRoles(List.of(superAdminRole));
            usuarioRepository.save(superAdmin);
            System.out.println("Usuário SUPER_ADMIN criado com sucesso.");
        } else {
            System.out.println("Usuário SUPER_ADMIN já existe.");
        }

        // 6. Criar Usuário USER se não existir
        String loginUser = "user";
        if (usuarioRepository.findByLogin(loginUser) == null) {
            Usuario user = new Usuario();
            user.setLogin(loginUser);
            user.setSenha(passwordEncoder.encode("user"));
            user.setRoles(List.of(userRole));
            usuarioRepository.save(user);
            System.out.println("Usuário USER criado com sucesso.");
        } else {
            System.out.println("Usuário USER já existe.");
        }
    }



}
