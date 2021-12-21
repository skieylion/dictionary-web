package jentus.dictionary.repository;

import jentus.dictionary.model.ContextDb;
import jentus.dictionary.model.ContextSortField;
import jentus.dictionary.model.ContextParams;
import jentus.dictionary.model.ContextSortType;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;


@Repository
@AllArgsConstructor
public class ContextRepositoryCustomImpl implements ContextRepositoryCustom {

    private final static String SQL_SELECT_ALL = "" +
            "select " +
            "   ctx.id, " +
            "   ce.contextStatusId " +
            "from Context ctx " +
            "left join ce " +
            "on ce.contextId=ctx.id ";

    @PersistenceContext
    private final EntityManager em;

    @Override
    public List<ContextDb> findByParams(ContextParams contextParams) {
        final int offset = contextParams.getOffset();
        final int limit = contextParams.getLimit();
        final var request = new StringBuilder();

        request.append(
                "with clist as ( " +
                        "with ce as (" +
                        "   select distinct on (evt.contextId) " +
                        "      evt.contextId," +
                        "      evt.eventDate, " +
                        "      evt.contextStatusId" +
                        "   from ContextEvent evt" +
                        "   order by contextId, eventDate desc " +
                        ")"
        );

        final var ids = contextParams.getContextListIds();
        final int sizeIds = ids != null ? ids.size() : 0;
        final var operation = contextParams.isUnionAll() ? "UNION" : "INTERSECT";

        for (int i = 0; i < sizeIds; i++) {
            if (i > 0) {
                request.append(operation).append(" ");
            }
            request.append(SQL_SELECT_ALL).append("  ");
            request.append("where ctx.id in (select cl.contextId from ContextAndContextList cl where cl.contextListId=?)").append(" ");
        }
        if (sizeIds == 0) {
            request.append(SQL_SELECT_ALL);
        }

        request.append(
                " )" +
                        " select" +
                        "   clist.id, " +
                        "   clist.contextStatusId " +
                        " from clist "
        );

        if (contextParams.getContextSortField() == ContextSortField.STATUS) {
            final var order = contextParams.getContextSortType() == ContextSortType.DESC ? "DESC" : "ASC";
            request.append(" ORDER BY clist.contextStatusId ").append(order).append(" ");
        }
        request.append(" OFFSET ").append(offset).append(" LIMIT ").append(limit).append(" ");

        Query query = em.createNativeQuery(request.toString(), ContextDb.class);

        for (int i = 0; i < sizeIds; i++) {
            query.setParameter(i, ids.get(i));
        }

        //System.out.println(request.toString());

        List<ContextDb> contextDbList = query.getResultList();
        contextDbList = contextDbList != null ? contextDbList : new ArrayList<>();

        return contextDbList;
    }
}
