package jentus.dictionary.service;

import jentus.dictionary.model.*;
import jentus.dictionary.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Service
@AllArgsConstructor
public class ExpressionServiceImpl implements ExpressionService {

    private final ExpressionRepository expressionRepository;

    @Override
    @Transactional
    public void save(Expression expression) {
        expressionRepository.save(expression);
    }

    @Override
    public List<Expression> findAll() {
        return expressionRepository.findAll();
    }

}
