package jentus.vocabulary.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Context")
public class Context {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Getter
    @Setter
    @Column(name = "definition")
    private String def;

    @Getter
    @Setter
    @Column(name = "translate")
    private String translate;

    @Getter
    @Setter
    @ManyToOne(targetEntity = Form.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "refForm")
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer"}) //"applications",
    private Form form;

    @Getter
    @Setter
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "SetAndContext",
            joinColumns = {@JoinColumn(name = "contextId")},
            inverseJoinColumns = {@JoinColumn(name = "setId")}
    )
    private Set<Sets> sets = new HashSet<>();

    @Getter
    @Setter
    @Fetch(FetchMode.SUBSELECT)
    @OneToMany(targetEntity = Example.class, mappedBy = "context", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<Example> examples;

    @Getter
    @Setter
    @ManyToOne(targetEntity = FileTable.class,fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "photo")
    @JsonIgnoreProperties(value = {"hibernateLazyInitializer"}) //"applications",
    private FileTable photoFile;

    @Getter
    @Setter
    @Fetch(FetchMode.SUBSELECT)
    @OneToMany(targetEntity = ContextEvent.class, mappedBy = "context", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private List<ContextEvent> contextEvent;
}
