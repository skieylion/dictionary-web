package jentus.dictionary.repository;

import jentus.dictionary.model.ContextAndContextList;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface ContextAndContextListRepository extends CrudRepository<ContextAndContextList,Long> {
    Optional<ContextAndContextList> findByContextIdAndContextListId(long contextId,long contextListId);
    Optional<ContextAndContextList> findByContextListId(long contextListId);
}
