package jentus.dictionary.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "TypeForm")
@Data
public class TypeForm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

}
