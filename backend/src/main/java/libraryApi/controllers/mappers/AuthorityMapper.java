package libraryApi.controllers.mappers;

import libraryApi.controllers.dto.ResponseAuthorityDTO;
import libraryApi.model.Authority;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AuthorityMapper {

    ResponseAuthorityDTO toDto(Authority authority);
}
