package jentus.dictionary.service;

import jentus.dictionary.model.ContextList;
import jentus.dictionary.model.ContextStatusType;
import jentus.dictionary.model.dto.ContextDto;

import java.util.List;

public interface ContextListService {
    void save(ContextList contextList);

    List<ContextList> findAll();

    void delete(long id);

    void attachToList(long contextListId, long contextId);

    void detachFromList(long contextListId, long contextId);

    List<ContextDto> findContextByStatusList(long contextListId, long limit, List<ContextStatusType> contextStatusTypeList);
}
