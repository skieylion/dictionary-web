package jentus.vocabulary.service;

import jentus.vocabulary.repository.FormRepository;
import jentus.vocabulary.repository.TypeFormRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class RunnerImpl implements Runner {

    private final FormRepository formRepository;

    @Override
    public void run() {

    }
}
