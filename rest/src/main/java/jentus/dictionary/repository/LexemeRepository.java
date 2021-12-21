package jentus.dictionary.repository;

import jentus.dictionary.model.Lexeme;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LexemeRepository extends CrudRepository<Lexeme,Long> {
    List<Lexeme> findAll();
}
