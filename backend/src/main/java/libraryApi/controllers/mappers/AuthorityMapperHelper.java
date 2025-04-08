package libraryApi.controllers.mappers;

import libraryApi.model.Authority;
import org.mapstruct.Named;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class AuthorityMapperHelper {

    @Named("mapAuthoritiesToNames")
    public static List<String> mapAuthoritiesToNames(Set<Authority> authorities) {
        if (authorities == null) return List.of();
        return authorities.stream()
                .map(Authority::getName)
                .collect(Collectors.toList());
    }
}
