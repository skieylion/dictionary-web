package jentus.dictionary.service;

import jentus.dictionary.model.*;
import jentus.dictionary.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Service
@AllArgsConstructor
public class LexemeServiceImpl implements LexemeService {

    private final LexemeRepository lexemeRepository;

    @Override
    @Transactional
    public void save(Lexeme lexeme) {
        lexemeRepository.save(lexeme);
    }

    @Override
    public List<Lexeme> findAll() {
        return lexemeRepository.findAll();
    }

}
