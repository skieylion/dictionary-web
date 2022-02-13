package jentus.dictionary.service;

import jentus.dictionary.model.ContextList;
import jentus.dictionary.model.ContextStatusType;
import jentus.dictionary.model.dto.ContextDtoReader;
import jentus.dictionary.model.dto.ContextDtoWriter;
import jentus.dictionary.model.dto.ContextListDto;

import java.util.List;

public interface ContextListService {
    void save(ContextList contextList);

    List<ContextListDto> findAll();

    void delete(long id);

    void attachToList(long contextListId, long contextId);

    void detachFromList(long contextListId, long contextId);

    void saveContextByContextListId(long contextListId, ContextDtoWriter contextDtoWriter);

    List<ContextDtoReader> findContextByContextListIdAndStatus(long contextListId,ContextStatusType status);

    List<ContextDtoReader> findContextByStatusList(long contextListId, long limit, List<ContextStatusType> contextStatusTypeList);
}
