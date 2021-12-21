package jentus.dictionary.model.dto;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Data;

@Data
public class ExampleDto {
    private Long id;
    private String text;
}
