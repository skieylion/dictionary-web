package jentus.dictionary.service;

import jentus.dictionary.exception.ContextNotFoundException;
import jentus.dictionary.model.Context;
import jentus.dictionary.model.ContextParams;
import jentus.dictionary.model.dto.ContextDto;

import java.util.List;

public interface ContextService {
    List<Context> findAllByListId(List<Long> listId);
    ContextDto findById(long id) throws ContextNotFoundException;
    void delete(long id);
    List<ContextDto> findByParams(ContextParams contextParams);
}