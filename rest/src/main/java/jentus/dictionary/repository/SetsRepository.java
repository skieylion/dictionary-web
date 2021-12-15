package jentus.dictionary.repository;

import jentus.dictionary.model.Form;
import jentus.dictionary.model.Sets;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SetsRepository extends CrudRepository<Sets,Long> {
    List<Sets> findAll();
}
