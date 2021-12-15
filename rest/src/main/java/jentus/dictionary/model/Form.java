package jentus.dictionary.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Form")
@Data
public class Form {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "value")
    private String value;
    @Column(name = "meta")
    private String meta;

    @Column(name="transcription")
    private String transcription;

    @ManyToOne(targetEntity = Lexeme.class,cascade = CascadeType.ALL)
    @JoinColumn(name = "lexemeId")
    private Lexeme lexeme;

    @ManyToOne(targetEntity = TypeForm.class,cascade = CascadeType.ALL)
    @JoinColumn(name = "typeId")
    private TypeForm type;

    @Fetch(FetchMode.SUBSELECT)
    @OneToMany(targetEntity = Context.class,mappedBy = "form",fetch = FetchType.EAGER,cascade = CascadeType.ALL,orphanRemoval = false)
    @JsonIgnore
    @ToString.Exclude
    private List<Context> contexts;

    @ManyToOne(targetEntity = FileTable.class,cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "audioFile")
    private FileTable audioFile;

}
