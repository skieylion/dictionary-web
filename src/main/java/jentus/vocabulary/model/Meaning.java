package jentus.vocabulary.model;

import lombok.Data;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.List;

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

    @ManyToOne(targetEntity = Form.class,cascade = CascadeType.ALL)
    @JoinColumn(name = "refForm")
    private Form form;

    @Fetch(FetchMode.SUBSELECT)
    @OneToMany(targetEntity = Example.class,mappedBy = "meaning",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private List<Example> examples;

}
