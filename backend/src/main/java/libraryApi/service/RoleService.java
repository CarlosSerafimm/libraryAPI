package libraryApi.service;

import libraryApi.controllers.dto.RequestRoleDTO;
import libraryApi.model.Role;
import libraryApi.model.Usuario;
import libraryApi.repository.RoleRepository;
import libraryApi.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

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


}
