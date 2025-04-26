package libraryApi.repository;

import libraryApi.model.Autor;
import libraryApi.model.GeneroLivro;
import libraryApi.model.Livro;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootTest
public class AutorRepositoryTest {

    @Autowired
    AutorRepository autorRepository;

    @Autowired
    LivroRepository livroRepository;


//    @Test
    public void salvarTest(){
        Autor autor = new Autor();
        autor.setNome("Caiox");
        autor.setNacionalidade("Brasileiro");
        autor.setDataNascimento(LocalDate.of(1950,1,31));

        autorRepository.save(autor);

        System.out.println("Autor salvo" + autor);
    }

    @Test
    public void atualizarTest(){

        Optional<Autor> possivelAutor = autorRepository.findById(2);


        if (possivelAutor.isPresent()){

            Autor autorEncontrado = possivelAutor.get();

            System.out.println("Dados autor: ");
            System.out.println(possivelAutor.get());

            autorEncontrado.setDataNascimento(LocalDate.of(2005,4,13));
            autorRepository.save(autorEncontrado);
        }
    }

    @Test
    public void listarTest(){
        List<Autor> lista = autorRepository.findAll();

        lista.forEach(System.out::println);
    }

    @Test
    public void countTest(){
        System.out.println("Contagem: " + autorRepository.count());
    }

    @Test
    public void deletePorIdTest(){
        autorRepository.deleteById(4);
    }

    @Test
    void salvarAutorComLivrosTeste(){
        Autor autor = new Autor();
        autor.setNome("romariz");
        autor.setNacionalidade("angolano");
        autor.setDataNascimento(LocalDate.of(1950,1,31));

        Livro livro = new Livro();
        livro.setIsbn("234414");
        livro.setPreco(BigDecimal.valueOf(100));
        livro.setGenero(GeneroLivro.ROMANCE);
        livro.setTitulo("Romanticos");
        livro.setDataPublicacao(LocalDate.of(1999,10,15));
        livro.setAutor(autor);

        Livro livro2 = new Livro();
        livro2.setIsbn("34324");
        livro2.setPreco(BigDecimal.valueOf(100));
        livro2.setGenero(GeneroLivro.FANTASIA);
        livro2.setTitulo("Fantasiado");
        livro2.setDataPublicacao(LocalDate.of(1999,10,15));
        livro2.setAutor(autor);

        autor.setLivros(new ArrayList<>());
        autor.getLivros().add(livro);
        autor.getLivros().add(livro2);

        autorRepository.save(autor);
        livroRepository.saveAll(autor.getLivros());
    }

    @Test
    @Transactional
    void listarLivrosAutor(){

        Autor autor = autorRepository.findById(11).orElse(null);
        autor.getLivros().forEach(System.out::println);
    }
}
