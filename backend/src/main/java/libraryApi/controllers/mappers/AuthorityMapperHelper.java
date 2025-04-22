package libraryApi.controllers.mappers;

import libraryApi.model.Authority;
import org.mapstruct.Named;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class AuthorityMapperHelper {

    @Named("mapAuthoritiesToEntities")
    public Set<Authority> mapAuthoritiesToEntities(List<String> authorityNames) {
        if (authorityNames == null || authorityNames.isEmpty()) {
            return null;
        }

        return authorityNames.stream()
                .map(name -> {
                    Authority authority = new Authority();
                    authority.setName(name); // Definir o nome da authority
                    return authority;
                })
                .collect(Collectors.toSet());
    }

    @Named("mapAuthoritiesToNames")
    public List<String> mapAuthoritiesToNames(Set<Authority> authorities) {
        if (authorities == null) {
            return null;
        }

        return authorities.stream()
                .map(Authority::getName) // Pega o nome de cada Authority
                .collect(Collectors.toList());
    }
}

