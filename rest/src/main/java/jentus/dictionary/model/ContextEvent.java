package jentus.dictionary.model;


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

    @Column(name = "eventDate")
    private Date eventDate;

    @ManyToOne(targetEntity = ContextStatus.class)
    @JoinColumn(name = "contextStatusId")
    private ContextStatus contextStatus;

    @Override
    public int compareTo(ContextEvent o) {
        return o.getEventDate().compareTo(getEventDate());
    }

    @ManyToOne(targetEntity = Context.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "contextId")
    private Context context;

}
