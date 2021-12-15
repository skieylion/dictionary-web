package jentus.dictionary.repository;

import jentus.dictionary.model.Context;

import java.util.List;

public interface ContextRepositoryCustom {
    //@Query(value="select m.* from Meaning m left join SetMeaning sm on sm.meaningId=m.id where sm.setId in :ids",nativeQuery = true)
    List<Context> findByParams(boolean isUnionAll, List<Long> listSets,boolean isStudiedToo);
}
