package jentus.vocabulary.service;

import jentus.vocabulary.model.Context;

import java.util.List;

public interface ServiceContext {
    List<Context> findAll();
    void delete(long id);
    List<Context> findBySets(boolean isUnionAll, List<Long> ids);
}
