package libraryApi.service;

import libraryApi.controllers.dto.RequestRoleDTO;
import libraryApi.controllers.dto.RequestUpdateRoleDTO;
import libraryApi.model.Authority;
import libraryApi.model.Role;
import libraryApi.model.Usuario;
import libraryApi.repository.AuthorityRepository;
import libraryApi.repository.RoleRepository;
import libraryApi.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private AuthorityRepository authorityRepository;

    public Role salvar(Role role){
        Role existente = roleRepository.findByRoleName(role.getRoleName().toUpperCase());
        if (existente != null) {
            throw new RuntimeException("Cargo já existe com o nome: " + role.getRoleName().toUpperCase());
        }

        Role entidade = new Role();
        entidade.setRoleName(role.getRoleName().toUpperCase());
        entidade.setCorRgba(role.getCorRgba());

        return roleRepository.save(entidade);
    }

    public void remover(Role role) {
        Role existente = roleRepository.findByRoleName(role.getRoleName().toUpperCase());
        roleRepository.delete(existente);
    }

    public List<Role> listarTodos() {
        return roleRepository.findAll();
    }
    public void atualizarRole(RequestUpdateRoleDTO dto) {
        Role role = roleRepository.findByRoleName(dto.roleName());


        role.setCorRgba(dto.corRgba());

        Set<Authority> novasAuthorities = authorityRepository.findByNameIn(dto.authorities());
        role.setAuthorities(novasAuthorities);

        roleRepository.save(role);
    }



}
