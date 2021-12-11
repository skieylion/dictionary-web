package jentus.vocabulary.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;


@Getter
@Setter
@Entity
@Table(name = "ContextEvent")
public class ContextEvent implements Comparable<ContextEvent> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "ts")
    private Date ts;

    @ManyToOne(targetEntity = Context.class)
    @JoinColumn(name = "contextId")
    @JsonIgnore
    private Context context;

    @ManyToOne(targetEntity = ContextStatus.class)
    @JoinColumn(name = "statusId")
    private ContextStatus contextStatus;

    @Override
    public int compareTo(ContextEvent o) {
        return o.getTs().compareTo(getTs());
    }
}
