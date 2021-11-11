package jentus.vocabulary.repository;

import jentus.vocabulary.model.Context;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContextRepository extends CrudRepository<Context,Long>, ContextRepositoryCustom {
    List<Context> findAll();
}
