package jentus.vocabulary.model;

import lombok.Data;
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

    @ManyToOne(targetEntity = Lexeme.class,cascade = CascadeType.ALL)
    @JoinColumn(name = "lexemeId")
    private Lexeme lexeme;

    @ManyToOne(targetEntity = TypeForm.class,cascade = CascadeType.ALL)
    @JoinColumn(name = "typeId")
    private TypeForm type;

    @Fetch(FetchMode.SUBSELECT)
    @OneToMany(targetEntity = Meaning.class,mappedBy = "form",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private List<Meaning> meanings;

}
