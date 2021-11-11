package jentus.vocabulary.service;

import jentus.vocabulary.model.Repeater;
import jentus.vocabulary.repository.ContextRepository;
import jentus.vocabulary.repository.RepeaterRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@AllArgsConstructor
public class RepeaterServiceImpl implements RepeaterService{

    private final RepeaterRepository repeaterRepository;
    private final ContextRepository contextRepository;

    @Override
    public void save(long contextId) {
        contextRepository.findById(contextId).ifPresent(context -> {
            Repeater repeater=new Repeater();
            repeater.setContext(context);
            repeater.setTs(new Date());
            repeaterRepository.save(repeater);
        });
    }
}
