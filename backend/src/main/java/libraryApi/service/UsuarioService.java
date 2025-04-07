package libraryApi.service;

import libraryApi.model.Role;
import libraryApi.model.Usuario;
import libraryApi.repository.RoleRepository;
import libraryApi.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;



    public void salvar(Usuario usuario, List<String> roleName){

        List<Role> roles = roleRepository.findByRoleNameIn(roleName);
        if (roles.isEmpty()) throw new RuntimeException("Role não encontrada!");
        usuario.setRoles(roles);

        String senha = usuario.getSenha();
        usuario.setSenha(passwordEncoder.encode(senha));

        usuarioRepository.save(usuario);
    }

    public Usuario obterPorLogin(String login){
        return usuarioRepository.findByLogin(login);
    }



}
