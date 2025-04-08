package libraryApi.controllers;

import libraryApi.controllers.dto.ResponseAuthorityDTO;
import libraryApi.controllers.dto.ResponseRoleDTO;
import libraryApi.controllers.mappers.AuthorityMapper;
import libraryApi.model.Authority;
import libraryApi.model.Role;
import libraryApi.service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/authority")
public class AuthorityController {

    @Autowired
    private AuthorityService authorityService;
    @Autowired
    private AuthorityMapper authorityMapper;

    @GetMapping
    public ResponseEntity<List<ResponseAuthorityDTO>> listarTodos() {
        List<Authority> authorities = authorityService.listarTodos();
        List<ResponseAuthorityDTO> dtoList = authorities.stream()
                .map(authorityMapper::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtoList);
    }


}
