package jentus.dictionary.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;

@Getter
@Setter
@Embeddable
@EqualsAndHashCode
public class ExpressionAndPartOfSpeechKey implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name = "expressionId")
    private long expressionId;
    @Column(name = "partOfSpeechId")
    private long partOfSpeechId;
}
