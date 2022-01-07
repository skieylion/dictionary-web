package jentus.dictionary.repository;

import jentus.dictionary.model.ExpressionAndPartOfSpeech;
import jentus.dictionary.model.ExpressionAndPartOfSpeechKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpressionAndPartOfSpeechRepository extends JpaRepository<ExpressionAndPartOfSpeech, ExpressionAndPartOfSpeechKey> {
}
