package jentus.dictionary.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "PartOfSpeech")
@Data
public class PartOfSpeech {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

}
