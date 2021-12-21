package jentus.dictionary.service;

import jentus.dictionary.exception.ContextStatusNotFoundException;
import jentus.dictionary.exception.ContextStatusNotSetException;
import jentus.dictionary.model.Context;
import jentus.dictionary.model.ContextStatus;
import jentus.dictionary.model.ContextStatusType;
import jentus.dictionary.model.dto.ContextStatusDto;

public interface ContextStatusService {
    void setStatus(long contextId, ContextStatusType contextStatusType) throws ContextStatusNotFoundException, ContextStatusNotSetException;
    ContextStatus getContextStatusByContextStatusType(ContextStatusType contextStatusType) throws ContextStatusNotFoundException;
    ContextStatusDto getContextStatusDtoByContext(Context context);
}
