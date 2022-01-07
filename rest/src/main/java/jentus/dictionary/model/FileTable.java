package jentus.dictionary.model;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
@Table(name = "FileTable")
@Getter
@Setter
public class FileTable {

    @Id
    @Type(type="pg-uuid")
    private String fileId;

    @Column(name = "name")
    private String name;

    @Column(name = "format")
    private String format;

    @Column(name = "path")
    private String path;
}
