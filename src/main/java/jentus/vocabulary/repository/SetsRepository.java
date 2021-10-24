package jentus.vocabulary.repository;

import jentus.vocabulary.model.Form;
import jentus.vocabulary.model.Sets;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SetsRepository extends CrudRepository<Sets,Long> {
    List<Sets> findAll();
}
