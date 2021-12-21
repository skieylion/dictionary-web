package jentus.dictionary.model.dto;

import lombok.Data;

@Data
public class ExampleDto {
    private Long id;
    private String text;
    private String audioExampleFile;
    private String videoExampleFile;
}
