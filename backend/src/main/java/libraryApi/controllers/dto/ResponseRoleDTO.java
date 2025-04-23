package libraryApi.controllers.dto;

import java.util.List;

public record ResponseRoleDTO(
        Integer id,
        String roleName,
        String corRgba,
        Boolean modificavel,
        List<String> authorities
) {
}
