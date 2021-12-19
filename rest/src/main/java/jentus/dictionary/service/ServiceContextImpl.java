package jentus.dictionary.service;

import jentus.dictionary.exception.ContextNotFoundException;
import jentus.dictionary.exception.ContextStatusNotFoundException;
import jentus.dictionary.model.Context;
import jentus.dictionary.repository.ContextEventRepository;
import jentus.dictionary.repository.ContextRepository;
import jentus.dictionary.repository.ContextStatusRepository;
import jentus.dictionary.repository.ContextListRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ServiceContextImpl implements ServiceContext {

    private final ContextRepository contextRepository;
    private final ContextEventRepository contextEventRepository;

    private final ContextListRepository contextListRepository;

    public ServiceContextImpl(ContextRepository contextRepository, ContextEventRepository contextEventRepository, ContextStatusRepository contextStatusRepository, ContextListRepository contextListRepository) throws ContextStatusNotFoundException {
        this.contextRepository = contextRepository;
        this.contextEventRepository = contextEventRepository;
        this.contextListRepository = contextListRepository;

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
    public void attachToSet(long contextId, long setId) {
        contextRepository.findById(contextId).ifPresent(context -> {
            contextListRepository.findById(setId).ifPresent(sets -> {
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
            contextListRepository.findById(setId).ifPresent(sets -> {
                contextRepository.detachContextFromSet(contextId, setId);
            });
        });
    }
}
