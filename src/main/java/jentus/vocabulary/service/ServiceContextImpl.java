package jentus.vocabulary.service;

import jentus.vocabulary.model.Context;
import jentus.vocabulary.repository.ContextRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ServiceContextImpl implements ServiceContext {

    private final ContextRepository contextRepository;

    @Override
    public List<Context> findAll() {
        return contextRepository.findAll();
    }

    @Override
    public void delete(long id) {
        contextRepository.deleteById(id);
    }

    @Override
    public List<Context> findBySets(boolean isUnionAll, List<Long> ids) {
        return contextRepository.findBySets(isUnionAll, ids);
    }
}
