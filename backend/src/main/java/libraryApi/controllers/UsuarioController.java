package libraryApi.controllers;

import libraryApi.controllers.dto.RequestRoleDTO;
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
    public ResponseEntity<Page<ResponseUsuarioDTO>> pesquisarUsuarios(
            @RequestParam(required = false) String login,
            @RequestParam(required = false) String roleName,
            @RequestParam(defaultValue = "0") Integer pagina,
            @RequestParam(defaultValue = "10") Integer tamanhoPagina
    ) {
        Page<Usuario> usuarios = usuarioService.pesquisar(login, roleName, pagina, tamanhoPagina);
        Page<ResponseUsuarioDTO> map = usuarios.map(ResponseUsuarioDTO::new);
        return ResponseEntity.ok(map);
    }

    @PostMapping("/addRole")
    public ResponseEntity<Void> adicionarRole(@RequestBody RequestRoleDTO request) {
        usuarioService.adicionarRoleAoUsuario(request.login(), request.roleName());
        return ResponseEntity.ok().build();
    }

    @PostMapping("/remRole")
    public ResponseEntity<Void> removerRole(@RequestBody RequestRoleDTO request) {
        usuarioService.removerRoleDoUsuario(request.login(), request.roleName());
        return ResponseEntity.noContent().build();
    }

}
