package jentus.vocabulary.service;

import jentus.vocabulary.model.Sets;
import jentus.vocabulary.repository.SetsRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class ServiceSetsImpl implements ServiceSets{

    private final SetsRepository setsRepository;

    @Override
    @Transactional
    public void save(Sets sets) {
        setsRepository.save(sets);
    }

    @Override
    public List<Sets> findAll() {
        return setsRepository.findAll();
    }

    @Override
    @Transactional
    public void delete(long id) {
        setsRepository.deleteById(id);
    }

}
