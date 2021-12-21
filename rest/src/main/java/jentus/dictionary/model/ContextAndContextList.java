package jentus.dictionary.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "ContextAndContextList")
@Getter
@Setter
public class ContextAndContextList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(targetEntity = Context.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "contextId")
    private Context context;

    @ManyToOne(targetEntity = ContextList.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "contextListId")
    private ContextList contextList;
}
