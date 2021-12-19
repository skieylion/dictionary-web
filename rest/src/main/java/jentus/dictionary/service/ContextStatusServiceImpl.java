package jentus.dictionary.service;

import jentus.dictionary.exception.ContextStatusNotFoundException;
import jentus.dictionary.exception.ContextStatusNotSetException;
import jentus.dictionary.model.ContextEvent;
import jentus.dictionary.model.ContextStatus;
import jentus.dictionary.model.ContextStatusType;
import jentus.dictionary.repository.ContextEventRepository;
import jentus.dictionary.repository.ContextRepository;
import jentus.dictionary.repository.ContextStatusRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class ContextStatusServiceImpl implements ContextStatusService {

    private final ContextRepository contextRepository;
    private final ContextEventRepository contextEventRepository;
    private final ContextStatus contextStatusRepeat;
    private final ContextStatus contextStatusStudied;

    public ContextStatusServiceImpl(
            ContextRepository contextRepository,
            ContextEventRepository contextEventRepository,
            ContextStatusRepository contextStatusRepository,
            @Value("${context.status.repeated}") long repeatedId,
            @Value("${context.status.studied}") long studiedId
    ) throws ContextStatusNotFoundException {
        this.contextRepository = contextRepository;
        this.contextEventRepository = contextEventRepository;
        this.contextStatusRepeat = contextStatusRepository.findById(repeatedId).orElseThrow(ContextStatusNotFoundException::new);
        this.contextStatusStudied = contextStatusRepository.findById(studiedId).orElseThrow(ContextStatusNotFoundException::new);
    }

    @Override
    @Transactional
    public void setStatus(long contextId, ContextStatusType contextStatusType) throws ContextStatusNotFoundException, ContextStatusNotSetException {
        ContextStatus contextStatus = getContextStatusByContextStatusType(contextStatusType);
        switch (contextStatusType) {
            case STUDIED:
            case REPEATED:
                this.contextRepository.findById(contextId).ifPresent(context -> {
                    ContextEvent contextEvent = new ContextEvent();
                    contextEvent.setContext(context);
                    contextEvent.setTs(new Date());
                    contextEvent.setContextStatus(contextStatus);
                    contextEventRepository.save(contextEvent);
                });
                break;
            case NEW:
                contextEventRepository.deleteAllEventsByContextId(contextId);
                break;
            default:
                throw new ContextStatusNotSetException();
        }
    }

    @Override
    public ContextStatus getContextStatusByContextStatusType(ContextStatusType contextStatusType) throws ContextStatusNotFoundException {
        switch (contextStatusType) {
            case REPEATED:
                return contextStatusRepeat;
            case STUDIED:
                return contextStatusStudied;
            default:
                throw new ContextStatusNotFoundException();
        }
    }

}
