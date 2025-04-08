package libraryApi.controllers;

import libraryApi.controllers.dto.RequestUserRoleDTO;
import libraryApi.controllers.dto.ResponseUsuarioDTO;
import libraryApi.model.Usuario;
import libraryApi.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Void> adicionarRole(@RequestBody RequestUserRoleDTO request) {
        usuarioService.adicionarRoleAoUsuario(request.login(), request.roleName());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/remRole")
    public ResponseEntity<Void> removerRole(@RequestBody RequestUserRoleDTO request) {
        usuarioService.removerRoleDoUsuario(request.login(), request.roleName());
        return ResponseEntity.noContent().build();
    }

}
