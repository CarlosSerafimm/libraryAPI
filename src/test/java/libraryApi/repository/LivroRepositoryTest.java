package libraryApi.repository;

import libraryApi.model.Autor;
import libraryApi.model.GeneroLivro;
import libraryApi.model.Livro;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class LivroRepositoryTest {

    @Autowired
    LivroRepository livroRepository;

    @Autowired
    AutorRepository autorRepository;

    @Test
    void salvarTest(){
        Livro livro = new Livro();

        livro.setIsbn("2132");
        livro.setPreco(BigDecimal.valueOf(100));
        livro.setGenero(GeneroLivro.BIOGRAFIA);
        livro.setTitulo("BIO");
        livro.setDataPublicacao(LocalDate.of(1999,10,15));

        Autor autor = autorRepository.findById(3).orElse(null);

        livro.setAutor(autor);

        livroRepository.save(livro);
    }

    @Test
    void salvarCascadeTest(){
        Livro livro = new Livro();

        livro.setIsbn("2132");
        livro.setPreco(BigDecimal.valueOf(100));
        livro.setGenero(GeneroLivro.FICCAO);
        livro.setTitulo("FICCAO");
        livro.setDataPublicacao(LocalDate.of(1999,10,15));

        Autor autor = new Autor();
        autor.setNome("Raiam");
        autor.setNacionalidade("Brasileiro");
        autor.setDataNascimento(LocalDate.of(1950,1,31));



        livro.setAutor(autor);

        livroRepository.save(livro);
    }

    @Test
    void atualizarAutorLivro(){
        Livro livroParaAtualizar = livroRepository.findById(2).orElse(null);

        Autor autor = autorRepository.findById(1).orElse(null);
        livroParaAtualizar.setAutor(autor);

        livroRepository.save(livroParaAtualizar);

    }

    @Test
    void buscarLivroTeste(){
        Livro livro = livroRepository.findById(3).orElse(null);

        System.out.println("Titulo: ");
        System.out.println(livro.getTitulo());

        System.out.println("Autor: ");
        System.out.println(livro.getAutor().getNome());
    }

    @Test
    void pesquisaPorTituloLivro(){

        List<Livro> lista = livroRepository.findByTituloContainingIgnoreCase("asiado");
        lista.forEach(System.out::println);
    }
}