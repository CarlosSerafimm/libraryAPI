package libraryApi.controllers.dto;

import java.util.Set;

public record RequestUpdateRoleDTO(String roleName, String corRgba, Set<String>authorities) {
}
