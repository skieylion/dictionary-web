package jentus.vocabulary.model;

import lombok.Data;

@Data
public class ExampleDto {
    private long id;
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
