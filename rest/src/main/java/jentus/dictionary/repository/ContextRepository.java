package jentus.dictionary.repository;

import jentus.dictionary.model.Context;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContextRepository extends CrudRepository<Context,Long>, ContextRepositoryCustom {
    @Modifying
    @Query(value = "delete SetAndContext where setId=:setId and contextId=:contextId",nativeQuery = true)
    void detachContextFromSet(@Param("contextId") long contextId, @Param("setId") long setId);

    @Query("select ctx from Context ctx where id in :listId")
    List<Context> findAllByListId(@Param("listId") List<Long> listId);

    @Query("select ctx from context ctx left join expression ex on ctx.expressionId=ex.id where ex.value=:query")
    Optional<Context> findContext(@Param("query") String query);
}
