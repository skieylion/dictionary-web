package jentus.dictionary.service;

import jentus.dictionary.model.Context;
import jentus.dictionary.model.dto.ContextDto;

public interface ContextToContextDtoConverter {
    ContextDto convert(Context context);
}
