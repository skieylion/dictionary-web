package jentus.vocabulary.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "Example")
@Data
public class Example {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "text")
    private String text;


    @ManyToOne(targetEntity = Meaning.class,cascade = CascadeType.ALL)
    @JoinColumn(name = "refMeaning")
    private Meaning meaning;
}
