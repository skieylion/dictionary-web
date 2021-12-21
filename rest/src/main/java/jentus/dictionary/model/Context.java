package jentus.dictionary.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Context")
@Getter
@Setter
public class Context {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "definition")
    private String definition;

    @Column(name = "translate")
    private String translate;

    @ManyToOne(targetEntity = LexemeAndPartOfSpeech.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "lexemeAndPartOfSpeechId")
    private LexemeAndPartOfSpeech lexemeAndPartOfSpeech;

    @ManyToOne(targetEntity = FileTable.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "photoId")
    private FileTable photoFile;

    @OneToMany(targetEntity = Example.class,mappedBy = "context", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<Example> examples;

    @OneToMany(targetEntity = ContextEvent.class, mappedBy = "context", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Fetch(value = FetchMode.SUBSELECT)
    private List<ContextEvent> contextEvents;

}
