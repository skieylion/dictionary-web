package jentus.dictionary.model;

import lombok.Data;

import java.util.List;

@Data
public class FormDto {
    private Long id;
    private String value;
    private String meta;
    private String transcription;
    private long lexemeId;
    private long typeId;
    private List<Long> listSetId;
    private List<ContextDto> contextDtoList;
    private List<ContextList> sets;
    private FileTable audioFile;

    @Override
    public String toString() {
        return "FormDto{" +
                "value='" + value + '\'' +
                ", meta='" + meta + '\'' +
                ", lexemeId=" + lexemeId +
                ", typeId=" + typeId +
                ", meaningDtoList=" + contextDtoList +
                '}';
    }
}
