package libraryApi.controllers.mappers;

import libraryApi.controllers.dto.AutorByIdDTO;
import libraryApi.controllers.dto.AutorDTO;
import libraryApi.model.Autor;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AutorMapper {

    Autor toEntity (AutorDTO dto);
    AutorDTO toDTO (Autor autor);
    AutorByIdDTO toByIdDTO (Autor autor);


}
