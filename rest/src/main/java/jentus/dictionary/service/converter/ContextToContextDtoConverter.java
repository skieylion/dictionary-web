package jentus.dictionary.service.converter;

import jentus.dictionary.model.Context;
import jentus.dictionary.model.dto.ContextDtoReader;

public interface ContextToContextDtoConverter {
    ContextDtoReader convert(Context context);
}
