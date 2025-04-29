package libraryApi.service;

import libraryApi.controllers.dto.ResponseAuthorityDTO;
import libraryApi.exceptions.NaoModificavelException;
import libraryApi.model.Authority;
import libraryApi.model.Role;
import libraryApi.model.Usuario;
import libraryApi.repository.RoleRepository;
import libraryApi.repository.UsuarioRepository;
import libraryApi.repository.specs.UsuarioSpecs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private RoleRepository roleRepository;


    public Page<Usuario> pesquisar(String login, String roleName, Integer pagina, Integer tamanhoPagina) {

        Specification<Usuario> specs = Specification.where((root, query, cb) -> cb.conjunction());

        if (login != null && !login.isBlank()) {
            specs = specs.and(UsuarioSpecs.loginLike(login));
        }

        if (roleName != null && !roleName.isBlank()) {
            specs = specs.and(UsuarioSpecs.hasRoleName(roleName));
        }

        Pageable pageable = PageRequest.of(pagina, tamanhoPagina);
        return usuarioRepository.findAll(specs, pageable);
    }



    public void adicionarRoleAoUsuario(String login, String roleName) {
        Usuario usuario = usuarioRepository.findByLogin(login);
        Role role = roleRepository.findByRoleName(roleName);

        if (!role.isModificavel()) {
            throw new NaoModificavelException("Esta role não pode ser modificada.");
        }
        if (!usuario.getRoles().contains(role)) {
            usuario.getRoles().add(role);
            usuarioRepository.save(usuario);
        }
    }

    public void removerRoleDoUsuario(String login, String roleName) {
        Usuario usuario = usuarioRepository.findByLogin(login);
        Role role = roleRepository.findByRoleName(roleName);

        if (!role.isModificavel()) {
            throw new NaoModificavelException("Esta role não pode ser modificada.");
        }

        if (usuario.getRoles().contains(role)) {
            usuario.getRoles().remove(role);
            usuarioRepository.save(usuario);
        }
    }


    public List<ResponseAuthorityDTO> getAuthoritiesByLogin(String login) {
        Usuario usuario = usuarioRepository.findByLogin(login);

        Set<Authority> authorities = usuario.getRoles().stream()
                .flatMap(role -> role.getAuthorities().stream())
                .collect(Collectors.toSet());

        return authorities.stream()
                .map(auth -> new ResponseAuthorityDTO(auth.getName()))
                .collect(Collectors.toList());
    }






}
