package jentus.dictionary.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ContextTable {
    private Integer draw;
    private Integer recordsTotal;
    private Integer recordsFiltered;
    private List<ContextTableData> data;
}
