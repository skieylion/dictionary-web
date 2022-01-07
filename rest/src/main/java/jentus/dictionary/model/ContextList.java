package jentus.dictionary.model;

import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ContextList")
@Data
public class ContextList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Override
    public int hashCode(){
        return (int)id;
    }

    @ManyToMany(mappedBy = "contextLists")
    private Set<Context> contexts=new HashSet<>();

}
