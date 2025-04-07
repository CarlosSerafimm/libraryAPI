package libraryApi.controllers.mappers;

import libraryApi.controllers.dto.RequestRegisterDTO;
import libraryApi.model.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "senha", source = "senha")
    Usuario toEntity(RequestRegisterDTO dto);
}
