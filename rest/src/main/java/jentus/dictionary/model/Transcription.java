package jentus.dictionary.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "Transcription")
@Getter
@Setter
public class Transcription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "value")
    private String value;

    //@JsonIgnoreProperties(value = {"hibernateLazyInitializer"}) //"applications",
    @ManyToOne(targetEntity = Lexeme.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "lexemeId")
    private Lexeme lexeme;

    @ManyToOne(targetEntity = TranscriptionVariant.class,fetch = FetchType.EAGER)
    @JoinColumn(name = "transcriptionVariantId")
    private TranscriptionVariant transcriptionVariant;

    @ManyToOne(targetEntity = FileTable.class,fetch = FetchType.LAZY)
    @JoinColumn(name = "fileId")
    private FileTable soundFile;
}
