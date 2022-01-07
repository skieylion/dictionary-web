package jentus.dictionary.repository;

import jentus.dictionary.model.PartOfSpeech;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartOfSpeechRepository extends CrudRepository<PartOfSpeech, Long> {
}
