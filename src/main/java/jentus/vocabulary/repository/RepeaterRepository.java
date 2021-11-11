package jentus.vocabulary.repository;

import jentus.vocabulary.model.Repeater;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepeaterRepository extends CrudRepository<Repeater,Long> {

    //@Query(value = "SELECT max(id) as id,MAX(r.ts) as dt,count(r.contextId) as [count] FROM [vocabulary].[dbo].[Repeater] r group by contextId",nativeQuery = true)
    //List<Repeater> findRepeaterByContextId(long id);
}
