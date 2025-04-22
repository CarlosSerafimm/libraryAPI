package libraryApi.controllers;

import libraryApi.controllers.dto.RequestUserRoleDTO;
import libraryApi.controllers.dto.ResponseUsuarioDTO;
import libraryApi.model.Usuario;
import libraryApi.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;


    @GetMapping
//    @PreAuthorize("hasAuthority('usuario:search')")
    public ResponseEntity<Page<ResponseUsuarioDTO>> pesquisarUsuarios(
            @RequestParam(required = false) String login,
            @RequestParam(required = false) String roleName,
            @RequestParam(defaultValue = "0") Integer pagina,
            @RequestParam(defaultValue = "5") Integer tamanhoPagina
    ) {
        Page<Usuario> usuarios = usuarioService.pesquisar(login, roleName, pagina, tamanhoPagina);
        Page<ResponseUsuarioDTO> map = usuarios.map(ResponseUsuarioDTO::new);
        return ResponseEntity.ok(map);
    }

    @PostMapping("/addRole")
//    @PreAuthorize("hasAuthority('usuario:addRole')")
    public ResponseEntity<Void> adicionarRole(@RequestBody RequestUserRoleDTO request) {
        String login = request.login();
        String roleName = request.roleName().toUpperCase();
        usuarioService.adicionarRoleAoUsuario(login, roleName);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/remRole")
//    @PreAuthorize("hasAuthority('usuario:removeRole')")
    public ResponseEntity<Void> removerRole(@RequestBody RequestUserRoleDTO request) {
        String login = request.login();
        String roleName = request.roleName().toUpperCase();
        usuarioService.removerRoleDoUsuario(login, roleName);
        return ResponseEntity.noContent().build();
    }

}
