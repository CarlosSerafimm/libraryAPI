package libraryApi.controllers;

import libraryApi.controllers.dto.RequestLoginDTO;
import libraryApi.controllers.dto.RequestRegisterDTO;
import libraryApi.controllers.mappers.UsuarioMapper;
import libraryApi.model.Usuario;
import libraryApi.security.CustomUserDetailsService;
import libraryApi.security.TokenService;
import libraryApi.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private UsuarioMapper usuarioMapper;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private TokenService tokenService;


    @PostMapping("/register")
    public ResponseEntity<Object> cadastrar(@RequestBody RequestRegisterDTO dto){
        try {

            Usuario usuario = usuarioMapper.toEntity(dto);

            System.out.println("Login: " + usuario.getLogin());
            System.out.println("Senha: " + usuario.getSenha());
            System.out.println("Role: " + dto.roleName());

            authService.register(usuario, dto.roleName());
            return ResponseEntity.ok().build();
        } catch (Exception e){
            e.getMessage();
        }
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody RequestLoginDTO requestLoginDTO) {
        try {
            String login = requestLoginDTO.login();
            String senha = requestLoginDTO.senha();

            Authentication authentication = autenticar(login, senha);
            SecurityContextHolder.getContext().setAuthentication(authentication);


            Usuario usuario = authService.obterPorLogin(login);
            String token = tokenService.generateToken(usuario);


            return ResponseEntity.ok(Collections.singletonMap("token", token));


        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).build();
        }
    }



    private Authentication autenticar(String login, String senha) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(login);

        if (!passwordEncoder.matches(senha, userDetails.getPassword())) {
            throw new BadCredentialsException("Senha inválida");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }



}
