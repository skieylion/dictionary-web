package jentus.dictionary.repository;

import jentus.dictionary.model.ContextList;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContextListRepository extends CrudRepository<ContextList,Long> {
    List<ContextList> findAll();
}
