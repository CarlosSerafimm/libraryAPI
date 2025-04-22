package libraryApi.controllers.dto;

import java.util.List;

public record RequestRoleDTO(String roleName, String corRgba, List<String> authorities) {
}
