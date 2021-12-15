package jentus.dictionary.model;

import lombok.Data;

@Data
public class ExampleDto {
    private Long id;
    private String text;
    private String audioExampleFile;
    private String videoExampleFile;


    @Override
    public String toString() {
        return "ExampleDto{" +
                "text='" + text + '\'' +
                '}';
    }
}
