package jentus.dictionary.model;

import lombok.Data;

import java.util.List;

@Data
public class ContextDto {
    private Long id;
    private String def;
    private String translate;
    private List<ExampleDto> exampleDtoList;
    private FileTable photoFile;

    @Override
    public String toString() {
        return "MeaningDto{" +
                "def='" + def + '\'' +
                ", translate='" + translate + '\'' +
                ", exampleDtoList=" + exampleDtoList +
                '}';
    }
}
