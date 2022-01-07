package jentus.dictionary.model.dto;

import lombok.Data;

import java.util.List;

@Data
public class ContextDtoReader {
    private Long id;
    private String expressionValue;
    private ContextStatusDto status;
    private String definition;
    private String translate;
    private List<ExampleDtoReader> exampleList;
    private PartOfSpeechDto partOfSpeech;
}
