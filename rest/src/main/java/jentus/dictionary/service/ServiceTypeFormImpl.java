package jentus.dictionary.service;

import jentus.dictionary.model.TypeForm;
import jentus.dictionary.repository.TypeFormRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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
