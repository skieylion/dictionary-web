package jentus.vocabulary.service;

import jentus.vocabulary.model.ContextEvent;
import jentus.vocabulary.repository.ContextRepository;
import jentus.vocabulary.repository.ContextEventRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@AllArgsConstructor
public class ContextEventServiceImpl implements ContextEventService {

    private final ContextEventRepository contextEventRepository;
    private final ContextRepository contextRepository;

    @Override
    public void save(long contextId) {
        contextRepository.findById(contextId).ifPresent(context -> {
            ContextEvent contextEvent =new ContextEvent();
            contextEvent.setContext(context);
            contextEvent.setTs(new Date());
            contextEventRepository.save(contextEvent);
        });
    }
}
