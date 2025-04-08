package libraryApi.controllers.dto;

import libraryApi.model.Role;
import libraryApi.model.Usuario;

import java.util.List;
import java.util.stream.Collectors;

public class ResponseUsuarioDTO {
    private Integer id;
    private String login;
    private List<ResponseRoleDTO> roles;

    public ResponseUsuarioDTO(Usuario usuario) {
        this.id = usuario.getId();
        this.login = usuario.getLogin();
        this.roles = usuario.getRoles().stream()
                .map(role -> new ResponseRoleDTO(role.getId(), role.getRoleName(), role.getCorRgba()))
                .collect(Collectors.toList());
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public List<ResponseRoleDTO> getRoles() {
        return roles;
    }

    public void setRoles(List<ResponseRoleDTO> roles) {
        this.roles = roles;
    }
}
