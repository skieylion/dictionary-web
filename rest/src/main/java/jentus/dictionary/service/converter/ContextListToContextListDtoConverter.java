package jentus.dictionary.service.converter;

import jentus.dictionary.model.ContextList;
import jentus.dictionary.model.dto.ContextListDto;

public interface ContextListToContextListDtoConverter {
    ContextListDto convert(ContextList contextList);
}
