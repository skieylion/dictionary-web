package jentus.dictionary.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "ContextStatus")
@Getter
@Setter
public class ContextStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    public ContextStatus() {
    }

//    public ContextStatus(ContextStatusType contextStatusType) {
//        this.id = contextStatusType.getStatusId();
//    }

}
