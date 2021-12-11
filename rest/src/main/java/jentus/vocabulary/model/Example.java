package jentus.vocabulary.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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


    @ManyToOne(targetEntity = Context.class)
    @JoinColumn(name = "refMeaning")
    @JsonIgnore
    private Context context;
}
