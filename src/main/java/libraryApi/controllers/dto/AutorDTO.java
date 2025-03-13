package libraryApi.controllers.dto;

import libraryApi.model.Autor;

import java.time.LocalDate;

public record AutorDTO(Integer id,String nome, LocalDate dataNascimento, String nacionalidade) {

    public Autor mapearAutor(){
        Autor autor = new Autor();
        autor.setNome(this.nome);
        autor.setDataNascimento(this.dataNascimento);
        autor.setNacionalidade(this.nacionalidade);
        return autor;
    }
}
