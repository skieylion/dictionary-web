package jentus.dictionary.service;

import jentus.dictionary.model.ContextList;

import java.util.List;

public interface ContextListService {
    void save(ContextList contextList);
    List<ContextList> findAll();
    void delete(long id);
}
