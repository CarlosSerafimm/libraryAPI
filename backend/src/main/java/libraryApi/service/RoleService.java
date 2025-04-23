package libraryApi.service;

import jakarta.persistence.EntityNotFoundException;
import libraryApi.controllers.dto.RequestUpdateRoleDTO;
import libraryApi.exceptions.NaoModificavelException;
import libraryApi.model.Authority;
import libraryApi.model.Role;
import libraryApi.model.Usuario;
import libraryApi.repository.AuthorityRepository;
import libraryApi.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private AuthorityRepository authorityRepository;

    public Role salvar(Role role) {
        Role existente = roleRepository.findByRoleName(role.getRoleName().toUpperCase());
        if (existente != null) {
            throw new RuntimeException("Cargo já existe com o nome: " + role.getRoleName().toUpperCase());
        }

        Set<Authority> authoritiesExistentes = new HashSet<>();
        for (Authority authority : role.getAuthorities()) {
            Authority authorityExistente = authorityRepository.findByName(authority.getName());
            if (authorityExistente == null) {
                throw new RuntimeException("A autoridade " + authority.getName() + " não existe no banco de dados.");
            }
            authoritiesExistentes.add(authorityExistente);
        }

        Role entidade = new Role();
        entidade.setRoleName(role.getRoleName().toUpperCase());
        entidade.setCorRgba(role.getCorRgba());
        entidade.setAuthorities(authoritiesExistentes);

        return roleRepository.save(entidade);
    }



    public void remover(Integer id) {
        Role existente = roleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Role com id " + id + " não encontrada."));

        if (!existente.isModificavel()) {
            throw new NaoModificavelException("Esta role não pode ser modificada.");
        }
        for (Usuario usuario : existente.getUsuarios()) {
            usuario.getRoles().remove(existente);
        }

        roleRepository.delete(existente);
    }




    public List<Role> listarTodos() {
        return roleRepository.findAll();
    }

    public void atualizarRole(Integer id, RequestUpdateRoleDTO dto) {
        Role role = roleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Role com id " + id + " não encontrada."));
        if (!role.isModificavel()) {
            throw new NaoModificavelException("Esta role não pode ser modificada.");
        }

        role.setRoleName(dto.roleName());
        role.setCorRgba(dto.corRgba());

        Set<Authority> novasAuthorities = authorityRepository.findByNameIn(dto.authorities());
        role.setAuthorities(novasAuthorities);

        roleRepository.save(role);
    }




}
