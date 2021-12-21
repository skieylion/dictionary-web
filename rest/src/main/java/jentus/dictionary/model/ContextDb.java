package jentus.dictionary.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class ContextDb {
    @Id
    private Long id;
    @Column(name = "contextStatusId")
    private Integer contextStatusId;
}