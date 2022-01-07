package jentus.dictionary.model;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "Expression")
@Data
public class Expression {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "value")
    private String value;

//    @ManyToMany(cascade = CascadeType.ALL,targetEntity = PartOfSpeech.class,fetch = FetchType.EAGER)
//    @JoinTable(
//            name="ExpressionAndPartOfSpeech",
//            joinColumns=@JoinColumn(name = "expressionId"),
//            inverseJoinColumns = @JoinColumn(name="partOfSpeechId")
//    )
//    private Set<PartOfSpeech> partOfSpeechSet=new HashSet<>();

}
