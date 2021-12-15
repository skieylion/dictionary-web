package jentus.dictionary.repository;

import jentus.dictionary.model.ContextEvent;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ContextEventRepository extends CrudRepository<ContextEvent,Long> {

    //@Query(value = "SELECT max(id) as id,MAX(r.ts) as dt,count(r.contextId) as [count] FROM [vocabulary].[dbo].[Repeater] r group by contextId",nativeQuery = true)
    //List<Repeater> findRepeaterByContextId(long id);

    @Modifying
    @Query("delete ContextEvent where contextId=:contextId")
    void deleteAllEventsByContextId(@Param("contextId") long contextId);

}
