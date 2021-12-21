package jentus.dictionary.model.dto;

import com.fasterxml.jackson.annotation.JsonRootName;
import jentus.dictionary.model.ContextStatusType;
import jentus.dictionary.model.FileTable;
import lombok.Data;

import java.util.List;

@Data
public class ContextDto {
    private Long id;
    private ContextStatusDto status;
    private String definition;
    private String translate;
    private List<ExampleDto> exampleList;
}
