package jentus.vocabulary.repository;

import jentus.vocabulary.model.Context;
import lombok.AllArgsConstructor;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicReference;

@AllArgsConstructor
public class ContextRepositoryCustomImpl implements ContextRepositoryCustom {

    @PersistenceContext
    private final EntityManager em;

    //@Query(value="select m.* from Meaning m left join SetMeaning sm on sm.meaningId=m.id where sm.setId in :ids",nativeQuery = true)
    public List<Context> findBySets(boolean isUnionAll, List<Long> listSets) {
        final String operation= isUnionAll ?" union ":" intersect ";
        AtomicBoolean firstStep= new AtomicBoolean(true);

        AtomicReference<String> sql= new AtomicReference<>("");
        listSets.forEach(id -> {
            sql.set(sql.get()+(firstStep.get() ?"":operation)+" select m.* from Context m left join SetAndContext sm on sm.contextId=m.id where sm.setId=? ");
            firstStep.set(false);
        });
        Query query=em.createNativeQuery(sql.get(), Context.class);
        AtomicReference<Short> index= new AtomicReference<>((short) 1);
        listSets.forEach(id -> {
            query.setParameter(index.getAndSet((short) (index.get() + 1)),id);
        });
        return query.getResultList();
    }
}
