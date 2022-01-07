package jentus.dictionary.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
public class PartOfSpeechDto {
    private long id;
    private String name;
}
