package jentus.vocabulary.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "Lexeme")
@Data
@AllArgsConstructor
public class Lexeme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "lexeme")
    private String lexeme;

    public Lexeme() {

    }
}
