package jentus.vocabulary.model;

import lombok.Data;

import java.util.List;

@Data
public class MeaningDto {
    private String def;
    private String translate;
    private List<ExampleDto> exampleDtoList;

    @Override
    public String toString() {
        return "MeaningDto{" +
                "def='" + def + '\'' +
                ", translate='" + translate + '\'' +
                ", exampleDtoList=" + exampleDtoList +
                '}';
    }
}
