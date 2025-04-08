package libraryApi.service;

import libraryApi.model.Authority;
import libraryApi.model.Role;
import libraryApi.repository.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorityService {

    @Autowired
    private AuthorityRepository authorityRepository;

    public List<Authority> listarTodos() {
        return authorityRepository.findAll();
    }
}
