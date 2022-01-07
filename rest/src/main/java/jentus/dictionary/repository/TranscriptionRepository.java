package jentus.dictionary.repository;

import jentus.dictionary.model.Transcription;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface TranscriptionRepository extends CrudRepository<Transcription,Long> {
    Optional<Transcription> findByValue(String value);
}
