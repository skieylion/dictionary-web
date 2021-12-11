package jentus.vocabulary.repository;

import jentus.vocabulary.model.TypeForm;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypeFormRepository extends CrudRepository<TypeForm,Long> {
    List<TypeForm> findAll();
}
