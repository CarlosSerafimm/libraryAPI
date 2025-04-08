package libraryApi.controllers.dto;

import java.util.List;

public record ResponseRoleDTO(
        String roleName,
        String corRgba,
        List<String> authorities
) {
}
