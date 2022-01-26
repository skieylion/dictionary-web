package jentus.dictionary.model.dto;

import lombok.Data;

import java.util.List;

@Data
public class ContextDtoWriter {
    private String photoId;
    private String expressionValue;
    private long partOfSpeechId;
    private String definition;
    private String translate;
    private String transcription;
    private List<String> exampleList;
}
