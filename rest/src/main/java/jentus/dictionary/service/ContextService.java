package jentus.dictionary.service;

import jentus.dictionary.exception.ContextNotFoundException;
import jentus.dictionary.model.Context;
import jentus.dictionary.model.ContextParams;
import jentus.dictionary.model.dto.ContextDtoReader;

import java.util.List;

public interface ContextService {
    List<Context> findAllByListId(List<Long> listId);
    ContextDtoReader findById(long id) throws ContextNotFoundException;
    void delete(long id);
    List<ContextDtoReader> findByParams(ContextParams contextParams);
    List<ContextDtoReader> findContext(String query);
}
