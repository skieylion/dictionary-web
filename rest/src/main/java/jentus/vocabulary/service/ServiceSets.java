package jentus.vocabulary.service;

import jentus.vocabulary.model.Sets;

import java.util.List;

public interface ServiceSets {
    void save(Sets sets);
    List<Sets> findAll();
    void delete(long id);
}
