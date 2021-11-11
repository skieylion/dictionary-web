package jentus.vocabulary.repository;

import jentus.vocabulary.model.Context;

import java.util.List;

public interface ContextRepositoryCustom {
    //@Query(value="select m.* from Meaning m left join SetMeaning sm on sm.meaningId=m.id where sm.setId in :ids",nativeQuery = true)
    List<Context> findBySets(boolean isUnionAll, List<Long> listSets);
}
