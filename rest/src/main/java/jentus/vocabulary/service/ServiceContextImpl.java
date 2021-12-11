package jentus.vocabulary.service;

import jentus.vocabulary.exception.ContextNotFoundException;
import jentus.vocabulary.exception.ContextStatusNotFoundException;
import jentus.vocabulary.model.Context;
import jentus.vocabulary.model.ContextEvent;
import jentus.vocabulary.model.ContextStatus;
import jentus.vocabulary.model.ContextStatusType;
import jentus.vocabulary.repository.ContextEventRepository;
import jentus.vocabulary.repository.ContextRepository;
import jentus.vocabulary.repository.ContextStatusRepository;
import jentus.vocabulary.repository.SetsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class ServiceContextImpl implements ServiceContext {

    private final ContextRepository contextRepository;
    private final ContextEventRepository contextEventRepository;
    private final ContextStatus contextStatusRepeat;
    private final ContextStatus contextStatusStudied;
    private final SetsRepository setsRepository;

    public ServiceContextImpl(ContextRepository contextRepository, ContextEventRepository contextEventRepository, ContextStatusRepository contextStatusRepository, SetsRepository setsRepository) throws ContextStatusNotFoundException {
        this.contextRepository = contextRepository;
        this.contextEventRepository = contextEventRepository;
        this.setsRepository = setsRepository;
        this.contextStatusRepeat = contextStatusRepository.findById(ContextStatusType.REPEATED.getStatusId()).orElseThrow(ContextStatusNotFoundException::new);
        this.contextStatusStudied = contextStatusRepository.findById(ContextStatusType.STUDIED.getStatusId()).orElseThrow(ContextStatusNotFoundException::new);
    }

    @Override
    public List<Context> findAll() {
        return contextRepository.findAll();
    }

    @Override
    public List<Context> findAllByListId(List<Long> listId) {
        return contextRepository.findAllByListId(listId);
    }


    @Override
    public Context findById(long id) throws ContextNotFoundException {
        return contextRepository.findById(id).orElseThrow(ContextNotFoundException::new);
    }

    @Override
    public void delete(long id) {
        contextRepository.deleteById(id);
    }

    @Override
    public List<Context> findByParams(boolean isUnionAll, List<Long> ids, boolean isStudiedToo) {
        return contextRepository.findByParams(isUnionAll, ids, isStudiedToo);
    }

    @Override
    public void know(long contextId) {
        contextRepository.findById(contextId).ifPresent(context -> {
            ContextEvent contextEvent = new ContextEvent();
            contextEvent.setContext(context);
            contextEvent.setTs(new Date());
            contextEvent.setContextStatus(contextStatusStudied);
            contextEventRepository.save(contextEvent);
        });
    }

    @Override
    @Transactional
    public void notKnow(long contextId) {
        contextRepository.findById(contextId).ifPresent(context -> {
            contextEventRepository.deleteAllEventsByContextId(contextId);
        });
    }

    @Override
    public void repeat(long contextId) {
        contextRepository.findById(contextId).ifPresent(context -> {
            ContextEvent contextEvent = new ContextEvent();
            contextEvent.setContext(context);
            contextEvent.setTs(new Date());
            contextEvent.setContextStatus(contextStatusRepeat);
            contextEventRepository.save(contextEvent);
        });
    }

    @Override
    public void attachToSet(long contextId, long setId) {
        contextRepository.findById(contextId).ifPresent(context -> {
            setsRepository.findById(setId).ifPresent(sets -> {
                if (!context.getSets().contains(sets)) {
                    context.getSets().add(sets);
                    contextRepository.save(context);
                }
            });
        });
    }

    @Override
    @Transactional
    public void detachFromSet(long contextId, long setId) {
        contextRepository.findById(contextId).ifPresent(context -> {
            setsRepository.findById(setId).ifPresent(sets -> {
                contextRepository.detachContextFromSet(contextId, setId);
            });
        });
    }
}
