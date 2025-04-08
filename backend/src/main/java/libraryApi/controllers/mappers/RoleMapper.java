package libraryApi.controllers.mappers;

import libraryApi.controllers.dto.RequestRoleDTO;
import libraryApi.controllers.dto.ResponseRoleDTO;
import libraryApi.model.Role;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring", uses = AuthorityMapperHelper.class)
public interface RoleMapper {

    Role requestToEntity(RequestRoleDTO dto);

    @Mapping(target = "authorities", source = "authorities", qualifiedByName = "mapAuthoritiesToNames")
    ResponseRoleDTO toResponseDTO(Role role);

    List<ResponseRoleDTO> toResponseList(List<Role> roles);
}
