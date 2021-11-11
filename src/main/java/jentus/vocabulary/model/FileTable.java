package jentus.vocabulary.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.nio.charset.StandardCharsets;

@Entity
@Table(name = "FileTable")
public class FileTable {
    @Getter
    @Setter
    @Id
    private String uid;

    @Getter
    @Setter
    @Column(name = "name")
    private String name;

    @Getter
    @Setter
    @Column(name = "mtype")
    private String mtype;

    @Getter
    @Setter
    @Column(name = "format")
    private String format;

    @Getter
    @Setter
    @Column(name = "url")
    private String url;

    @Getter
    @Setter
    @Lob
    @Column(name = "data", columnDefinition = "BLOB")
    @JsonIgnore
    private byte[] data;

    @Transient
    private String dataStr;

    public void setDataStr(String dataStr){
        this.dataStr=dataStr;
        this.data=dataStr.getBytes(StandardCharsets.UTF_8);
    }

    public String getDataStr(){
        return new String(this.data);
    }
}
