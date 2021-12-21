package jentus.dictionary.model.dto;

import jentus.dictionary.model.ContextStatusType;
import jentus.dictionary.model.ContextTimeUnit;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ContextStatusDto {
    private final ContextStatusType contextStatusType;
    private final double offset;
    private final ContextTimeUnit contextTimeUnit;
}
