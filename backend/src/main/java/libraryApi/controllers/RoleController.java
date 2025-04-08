package libraryApi.controllers;

import libraryApi.controllers.dto.RequestRoleDTO;
import libraryApi.controllers.dto.ResponseRoleDTO;
import libraryApi.controllers.mappers.RoleMapper;
import libraryApi.model.Role;
import libraryApi.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {
    @Autowired
    private RoleService roleService;
    @Autowired
    private RoleMapper roleMapper;

    @PostMapping
    public ResponseEntity<Void> criarRole(@RequestBody RequestRoleDTO dto){

        Role role = roleMapper.requestToEntity(dto);
        roleService.salvar(role);

        return ResponseEntity.ok().build();

    }

    @DeleteMapping
    public ResponseEntity<Void> deletar(@RequestBody RequestRoleDTO dto){
        Role role = roleMapper.requestToEntity(dto);
        roleService.remover(role);
        return ResponseEntity.noContent().build();
    }
    @GetMapping
    public ResponseEntity<List<ResponseRoleDTO>> listarTodos() {
        List<Role> roles = roleService.listarTodos();
        List<ResponseRoleDTO> dtos = roles.stream()
                .map(roleMapper::toResponseDTO)
                .toList();

        return ResponseEntity.ok(dtos);
    }


}
