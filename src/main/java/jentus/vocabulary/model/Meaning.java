package jentus.vocabulary.model;

import lombok.Data;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Meaning")
@Data
public class Meaning {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "definition")
    private String def;

    @Column(name = "translate")
    private String translate;

    @ManyToOne(targetEntity = Form.class)
    @JoinColumn(name = "refForm")
    private Form form;

    @ManyToMany
    @JoinTable(
            name = "SetMeaning",
            joinColumns = {@JoinColumn(name = "meaningId")},
            inverseJoinColumns = {@JoinColumn(name = "setId")}
    )
    private Set<Sets> sets = new HashSet<>();

    @Fetch(FetchMode.SUBSELECT)
    @OneToMany(targetEntity = Example.class, mappedBy = "meaning", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = false)
    private List<Example> examples;

}
