package jentus.vocabulary.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Repeater")
public class Repeater {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Getter
    @Setter
    @Column(name = "ts")
    private Date ts;

    @Getter
    @Setter
    @ManyToOne(targetEntity = Context.class)
    @JoinColumn(name = "contextId")
    @JsonIgnore
    private Context context;
}
