package jentus.vocabulary.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "Sets")
@Data
public class Sets {
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
}
