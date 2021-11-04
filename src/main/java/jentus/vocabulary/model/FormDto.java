package jentus.vocabulary.model;

import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
public class FormDto {
    private String value;
    private String meta;
    private String transcription;
    private long lexemeId;
    private long typeId;
    private List<Long> listSetId;
    private List<MeaningDto> meaningDtoList;
    private List<Sets> sets;

    @Override
    public String toString() {
        return "FormDto{" +
                "value='" + value + '\'' +
                ", meta='" + meta + '\'' +
                ", lexemeId=" + lexemeId +
                ", typeId=" + typeId +
                ", meaningDtoList=" + meaningDtoList +
                '}';
    }
}
