package libraryApi.security;

import libraryApi.model.Usuario;
import libraryApi.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AuthService authService;

    public CustomUserDetailsService(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {

        Usuario usuario = authService.obterPorLogin(login);
        if (usuario == null) throw new UsernameNotFoundException("Usuario não encontrado");

        List<String> authorities = usuario.getRoles().stream()
                .flatMap(role -> role.getAuthorities().stream())
                .map(authority -> authority.getName())
                .toList();

        return User.builder()
                .username(usuario.getLogin())
                .password(usuario.getSenha())
                .authorities(authorities.toArray(new String[0]))
                .build();
    }
}
