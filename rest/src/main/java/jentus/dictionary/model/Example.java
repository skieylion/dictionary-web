package jentus.dictionary.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "Example")
@Getter
@Setter
public class Example {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "text")
    private String text;

    @ManyToOne(targetEntity = Context.class)
    @JoinColumn(name = "contextId")
    @JsonIgnore
    private Context context;
}
