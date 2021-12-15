package jentus.dictionary.repository;

import jentus.dictionary.model.Context;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicReference;

@Repository
public class ContextRepositoryCustomImpl implements ContextRepositoryCustom {

    @PersistenceContext
    private final EntityManager em;

    private final long setAllId;

    public ContextRepositoryCustomImpl(EntityManager em,@Value("${setAllId}") long setAllId) {
        this.em = em;
        this.setAllId=setAllId;
    }


    //@Query(value="select m.* from Meaning m left join SetMeaning sm on sm.meaningId=m.id where sm.setId in :ids",nativeQuery = true)
    public List<Context> findByParams(boolean isUnionAll, List<Long> listSets,boolean isStudiedToo) {

        boolean isAll=false;
        if(listSets.size()==1&&listSets.get(0)==setAllId){
            isAll=true;
        }

        final String operation= isUnionAll ?" union ":" intersect ";
        AtomicBoolean firstStep= new AtomicBoolean(true);

        AtomicReference<String> sql= new AtomicReference<>("");
        //String sql1=" select m.* from Context m left join SetAndContext sm on sm.contextId=m.id where sm.setId=? ";
        String sql1=isAll?" select m.* from Context m ":" select m.* from Context m left join SetAndContext sm on sm.contextId=m.id where sm.setId=? ";

        if(!isAll) {
            if (!isStudiedToo) {
                sql1 += "  ";
            }
            final String finalSql = sql1;
            listSets.forEach(id -> {
                sql.set(sql.get() + (firstStep.get() ? "" : operation) + finalSql);
                firstStep.set(false);
            });
            Query query = em.createNativeQuery(sql.get(), Context.class);
            AtomicReference<Short> index = new AtomicReference<>((short) 1);
            listSets.forEach(id -> {
                query.setParameter(index.getAndSet((short) (index.get() + 1)), id);
            });
            return query.getResultList();
        } else  {
            sql.set(sql1);
            Query query = em.createNativeQuery(sql.get(), Context.class);
            return query.getResultList();
        }
    }
}
