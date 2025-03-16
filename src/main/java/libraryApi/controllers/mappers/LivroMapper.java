package libraryApi.controllers.mappers;

import libraryApi.controllers.dto.RequestLivroDTO;
import libraryApi.model.Livro;
import libraryApi.repository.AutorRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class LivroMapper {

    @Autowired
    AutorRepository autorRepository;

    @Mapping(target = "autor", expression = "java( autorRepository.findById(dto.idAutor()).orElse(null) )")
    public abstract Livro toEntity(RequestLivroDTO dto);
}
