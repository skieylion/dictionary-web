package jentus.vocabulary.service;

import jentus.vocabulary.model.Sets;
import jentus.vocabulary.model.TypeForm;
import jentus.vocabulary.repository.SetsRepository;
import jentus.vocabulary.repository.TypeFormRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class ServiceTypeFormImpl implements ServiceTypeForm{

    private final TypeFormRepository typeFormRepository;


    @Override
    public List<TypeForm> findAll() {
        return typeFormRepository.findAll();
    }

}
