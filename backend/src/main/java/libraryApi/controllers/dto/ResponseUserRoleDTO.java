package libraryApi.controllers.dto;

public class ResponseUserRoleDTO {
    private Integer id;
    private String roleName;
    private String corRgba;

    public ResponseUserRoleDTO(Integer id, String roleName, String corRgba) {
        this.id = id;
        this.roleName = roleName;
        this.corRgba = corRgba;
    }

    public Integer getId() {
        return id;
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

    public String getCorRgba() {
        return corRgba;
    }

    public void setCorRgba(String corRgba) {
        this.corRgba = corRgba;
    }
}
