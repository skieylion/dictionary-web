package jentus.vocabulary.repository;

import jentus.vocabulary.model.Meaning;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MeaningRepository extends CrudRepository<Meaning,Long>,MeaningRepositoryCustom {
    List<Meaning> findAll();
    //@Query(value="select m.* from Meaning m left join SetMeaning sm on sm.meaningId=m.id where sm.setId in :ids",nativeQuery = true)
    //List<Meaning> findBySets(@Param("ids") List<Long> listSets);
}
