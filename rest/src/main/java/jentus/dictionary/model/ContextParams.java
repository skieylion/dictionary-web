package jentus.dictionary.model;

import jentus.dictionary.model.ContextStatusType;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ContextParams {
    private ContextStatusType contextStatusType;
    private List<Long> contextListIds;
    private boolean isUnionAll;
    private int offset;
    private int limit;
    private ContextSortField contextSortField;
    private ContextSortType contextSortType;

}
