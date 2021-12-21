package jentus.dictionary.model;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "LexemeAndPartOfSpeech")
@Getter
@Setter
public class LexemeAndPartOfSpeech {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(targetEntity = PartOfSpeech.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "partOfSpeechId")
    private PartOfSpeech partOfSpeech;

    @ManyToOne(targetEntity = Lexeme.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "lexemeId")
    private Lexeme lexeme;
}
