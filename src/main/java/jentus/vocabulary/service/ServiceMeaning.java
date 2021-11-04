package jentus.vocabulary.service;

import jentus.vocabulary.model.Meaning;

import java.util.List;

public interface ServiceMeaning {
    List<Meaning> findAll();
    void delete(long id);
    List<Meaning> findBySets(boolean isUnionAll,List<Long> ids);
}
