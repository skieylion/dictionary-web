package jentus.vocabulary.service;

import jentus.vocabulary.model.Meaning;
import jentus.vocabulary.repository.MeaningRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ServiceMeaningImpl implements ServiceMeaning {

    private final MeaningRepository meaningRepository;

    @Override
    public List<Meaning> findAll() {
        return meaningRepository.findAll();
    }

    @Override
    public void delete(long id) {
        meaningRepository.deleteById(id);
    }

    @Override
    public List<Meaning> findBySets(boolean isUnionAll, List<Long> ids) {
        return meaningRepository.findBySets(isUnionAll, ids);
    }
}
