package jentus.dictionary.repository;

import jentus.dictionary.model.Form;
import jentus.dictionary.model.Sets;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FormRepository extends CrudRepository<Form,Long> {
    List<Form> findAll();
}
