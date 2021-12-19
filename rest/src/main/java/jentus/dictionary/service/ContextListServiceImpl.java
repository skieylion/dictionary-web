package jentus.dictionary.service;

import jentus.dictionary.model.ContextList;
import jentus.dictionary.repository.ContextListRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class ContextListServiceImpl implements ContextListService {

    private final ContextListRepository contextListRepository;

    @Override
    @Transactional
    public void save(ContextList contextList) {
        contextListRepository.save(contextList);
    }

    @Override
    public List<ContextList> findAll() {
        return contextListRepository.findAll();
    }

    @Override
    @Transactional
    public void delete(long id) {
        contextListRepository.deleteById(id);
    }

}
