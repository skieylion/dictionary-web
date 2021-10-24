package jentus.vocabulary.model;

import lombok.Data;

import java.util.List;

@Data
public class FormDto {
    private String value;
    private String meta;
    private long lexemeId;
    private long typeId;
    private List<MeaningDto> meaningDtoList;

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
