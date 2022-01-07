package jentus.dictionary.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Table(name = "ExpressionAndPartOfSpeech")
public class ExpressionAndPartOfSpeech {

    @EmbeddedId
    private ExpressionAndPartOfSpeechKey expressionAndPartOfSpeechKey;

//    @ManyToOne
//    @JoinColumn(name = "expressionId",insertable = false,updatable = false)
//    private Expression expression;
//
//    @ManyToOne
//    @JoinColumn(name = "partOfSpeechId",insertable = false,updatable = false)
//    private PartOfSpeech partOfSpeech;

    public ExpressionAndPartOfSpeech() {
    }

    public ExpressionAndPartOfSpeech(Expression expression,PartOfSpeech partOfSpeech) {
        ExpressionAndPartOfSpeechKey expressionAndPartOfSpeechKey=new ExpressionAndPartOfSpeechKey();
        expressionAndPartOfSpeechKey.setExpressionId(expression.getId());
        expressionAndPartOfSpeechKey.setPartOfSpeechId(partOfSpeech.getId());
        this.expressionAndPartOfSpeechKey=expressionAndPartOfSpeechKey;
//        this.expression=expression;
//        this.partOfSpeech=partOfSpeech;
    }

}
