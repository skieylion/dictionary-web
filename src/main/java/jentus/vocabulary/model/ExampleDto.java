package jentus.vocabulary.model;

import lombok.Data;

@Data
public class ExampleDto {
    private String text;

    @Override
    public String toString() {
        return "ExampleDto{" +
                "text='" + text + '\'' +
                '}';
    }
}
