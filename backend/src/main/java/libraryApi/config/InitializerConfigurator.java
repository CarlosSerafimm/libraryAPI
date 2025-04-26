package libraryApi.config;

import jakarta.annotation.PostConstruct;
import libraryApi.model.*;
import libraryApi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.time.LocalDate;
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

    @Autowired
    private AutorRepository autorRepository;

    @Autowired
    private LivroRepository livroRepository;

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

        // 7 - inserir dados mockados de Autores
        if (autorRepository.count() == 0 && livroRepository.count() == 0) {
            Autor autor1 = new Autor();
            autor1.setNome("Gabriel García Márquez");
            autor1.setNacionalidade("Colombiano");
            autor1.setDataNascimento(LocalDate.of(1927, 3, 6));
            autor1.setUsuario(null); // <- como pedido

            Autor autor2 = new Autor();
            autor2.setNome("Jane Austen");
            autor2.setNacionalidade("Britânica");
            autor2.setDataNascimento(LocalDate.of(1775, 12, 16));
            autor2.setUsuario(null); // <- como pedido

            Autor autor3 = new Autor();
            autor3.setNome("Machado de Assis");
            autor3.setNacionalidade("Brasileiro");
            autor3.setDataNascimento(LocalDate.of(1839, 6, 21));
            autor3.setUsuario(null); // <- como pedido

            autorRepository.saveAll(List.of(autor1, autor2, autor3));
            System.out.println("Autores mockados criados com sucesso.");

            Livro livro1 = new Livro();
            livro1.setIsbn("978-0-06-088328-7");
            livro1.setTitulo("Cem Anos de Solidão");
            livro1.setDataPublicacao(LocalDate.of(1967, 5, 30));
            livro1.setGenero(GeneroLivro.BIOGRAFIA);
            livro1.setPreco(new BigDecimal(59.90));
            livro1.setAutor(autor1);
            livro1.setUsuario(null);

            Livro livro2 = new Livro();
            livro2.setIsbn("978-0-19-953556-9");
            livro2.setTitulo("Orgulho e Preconceito");
            livro2.setDataPublicacao(LocalDate.of(1813, 1, 28));
            livro2.setGenero(GeneroLivro.ROMANCE);
            livro2.setPreco(new BigDecimal(39.90));
            livro2.setAutor(autor2);
            livro2.setUsuario(null);

            Livro livro3 = new Livro();
            livro3.setIsbn("978-0-14-044749-1");
            livro3.setTitulo("Dom Casmurro");
            livro3.setDataPublicacao(LocalDate.of(1899, 2, 1));
            livro3.setGenero(GeneroLivro.ROMANCE);
            livro3.setPreco(new BigDecimal(45.50));
            livro3.setAutor(autor3);
            livro3.setUsuario(null);

            Livro livro4 = new Livro();
            livro4.setIsbn("978-0-06-112241-5");
            livro4.setTitulo("O Amor nos Tempos do Cólera");
            livro4.setDataPublicacao(LocalDate.of(1985, 9, 5));
            livro4.setGenero(GeneroLivro.ROMANCE);
            livro4.setPreco(new BigDecimal(69.90));
            livro4.setAutor(autor1);
            livro4.setUsuario(null);

            livroRepository.saveAll(List.of(livro1, livro2, livro3, livro4));
            System.out.println("dados mockados com sucesso.");
        }
        else {
            System.out.println("Dados já existem e não foram criados");
        }
    }



}
