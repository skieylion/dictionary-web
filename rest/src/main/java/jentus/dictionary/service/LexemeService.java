package jentus.dictionary.service;


import jentus.dictionary.model.Lexeme;
import jentus.dictionary.model.FormDto;

import java.util.List;

public interface LexemeService {
    void save(Lexeme lexeme);
    List<Lexeme> findAll();
}
