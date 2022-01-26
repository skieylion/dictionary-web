package jentus.dictionary.model.dto;

import lombok.Data;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
public class ContextDtoReader {
    private Long id;
    private String expressionValue;
    private ContextStatusDto status;
    private String definition;
    private String translate;
    private List<ExampleDtoReader> exampleList;
    private PartOfSpeechDto partOfSpeech;
    private Set<TranscriptionDto> transcription=new HashSet<>();
    private String photoId;
}
