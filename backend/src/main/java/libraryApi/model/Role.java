package libraryApi.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 50)
    @Size(min = 2, max = 50, message = "Adicione um nome de cargo entre 2-50 caracteres")
    private String roleName;

    @Column(name = "cor_rgba", length = 25)
    private String corRgba;


    @Column(nullable = false)
    private boolean modificavel = true;

    @ManyToMany(mappedBy = "roles", fetch = FetchType.EAGER)
    private List<Usuario> usuarios;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "role_authorities",
            joinColumns = @JoinColumn(name = "role_id"),
            inverseJoinColumns = @JoinColumn(name = "authority_id")
    )
    private Set<Authority> authorities;

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public List<Usuario> getUsuarios() {
        return usuarios;
    }

    public void setUsuarios(List<Usuario> usuarios) {
        this.usuarios = usuarios;
    }

    public String getCorRgba() {
        return corRgba;
    }

    public void setCorRgba(String corRgba) {
        this.corRgba = corRgba;
    }

    public boolean isModificavel() {
        return modificavel;
    }

    public void setModificavel(boolean modificavel) {
        this.modificavel = modificavel;
    }
}
