package jentus.vocabulary.repository;

import jentus.vocabulary.model.Form;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormRepository extends CrudRepository<Form,Long> {
}
