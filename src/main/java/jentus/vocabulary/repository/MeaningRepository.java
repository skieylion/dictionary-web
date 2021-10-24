package jentus.vocabulary.repository;

import jentus.vocabulary.model.Meaning;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeaningRepository extends CrudRepository<Meaning,Long> {
}
