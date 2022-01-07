package jentus.dictionary.service;


import jentus.dictionary.model.Expression;

import java.util.List;

public interface ExpressionService {
    void save(Expression expression);
    List<Expression> findAll();
}
