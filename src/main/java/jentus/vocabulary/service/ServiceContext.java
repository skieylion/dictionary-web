package jentus.vocabulary.service;

import jentus.vocabulary.exception.ContextNotFoundException;
import jentus.vocabulary.model.Context;

import java.util.List;

public interface ServiceContext {
    List<Context> findAll();
    List<Context> findAllByListId(List<Long> listId);
    Context findById(long id) throws ContextNotFoundException;
    void delete(long id);
    List<Context> findByParams(boolean isUnionAll, List<Long> ids,boolean isStudiedToo);
    void know(long contextId);
    void notKnow(long contextId);
    void repeat(long contextId);
    void attachToSet(long contextId,long setId);
    void detachFromSet(long contextId,long setId);
}
