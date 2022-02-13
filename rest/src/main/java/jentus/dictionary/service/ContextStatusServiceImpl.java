package jentus.dictionary.service;

import jentus.dictionary.exception.ContextStatusNotFoundException;
import jentus.dictionary.exception.ContextStatusNotSetException;
import jentus.dictionary.model.*;
import jentus.dictionary.model.dto.ContextStatusDto;
import jentus.dictionary.repository.ContextEventRepository;
import jentus.dictionary.repository.ContextRepository;
import jentus.dictionary.repository.ContextStatusRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ContextStatusServiceImpl implements ContextStatusService {

    private final ContextRepository contextRepository;
    private final ContextEventRepository contextEventRepository;
    private final ContextStatus contextStatusRepeated;
    private final ContextStatus contextStatusStudied;
    private final ContextStatus contextStatusNew;

    public ContextStatusServiceImpl(
            ContextRepository contextRepository,
            ContextEventRepository contextEventRepository,
            ContextStatusRepository contextStatusRepository,
            @Value("${context.status.repeated}") long repeatedId,
            @Value("${context.status.studied}") long studiedId,
            @Value("${context.status.new}") long newId
    ) throws ContextStatusNotFoundException {
        this.contextRepository = contextRepository;
        this.contextEventRepository = contextEventRepository;
        this.contextStatusRepeated = contextStatusRepository.findById(repeatedId).orElseThrow(ContextStatusNotFoundException::new);
        this.contextStatusStudied = contextStatusRepository.findById(studiedId).orElseThrow(ContextStatusNotFoundException::new);
        this.contextStatusNew = contextStatusRepository.findById(newId).orElseThrow(ContextStatusNotFoundException::new);
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
                    contextEvent.setEventDate(new Date());
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
                return contextStatusRepeated;
            case STUDIED:
                return contextStatusStudied;
            case NEW:
                return contextStatusNew;
            default:
                throw new ContextStatusNotFoundException();
        }
    }

    @Override
    public ContextStatusDto getContextStatusDtoByContext(Context context) {
        List<ContextEvent> contextEventList = context.getContextEvents();
        int size = contextEventList != null ? contextEventList.size() : 0;
        if (size == 0) return new ContextStatusDto(ContextStatusType.NEW, 0, ContextTimeUnit.NONE);

        List<Date> dateList = new ArrayList<>();
        for (ContextEvent contextEvent : contextEventList) {
            if (contextEvent.getContextStatus().getId() == contextStatusRepeated.getId()) {
                dateList.add(contextEvent.getEventDate());
            } else if (contextEvent.getContextStatus().getId() == contextStatusStudied.getId()) {
                return new ContextStatusDto(ContextStatusType.STUDIED, 0, ContextTimeUnit.NONE);
            }
        }

        dateList.sort(Date::compareTo);
        int sizeDateList = dateList.size();

        Date last = sizeDateList > 0 ? dateList.get(dateList.size() - 1) : null;
        size = last != null ? size : 0;
        Date current = new Date();
        double offset = size > 0 ? (double) (current.getTime() - last.getTime()) / 1000 / 60 : 0;

        ContextStatusType status = ContextStatusType.UNREPEATED;

        switch (size) {
            case 0:
                return new ContextStatusDto(ContextStatusType.NEW, 0, ContextTimeUnit.NONE);
            case 1:

                if (offset < 30) {
                    status = ContextStatusType.REPEATED;
                }
                return new ContextStatusDto(status, Math.ceil(30 - offset), ContextTimeUnit.MIN);

            case 2:
                offset = offset / 60;
                if (offset < 24) {
                    status = ContextStatusType.REPEATED;
                }
                return new ContextStatusDto(status, Math.ceil(24 - offset), ContextTimeUnit.HOUR);

            case 3:
                offset = offset / 60;
                var week3 = 24 * 7 * 3;
                if (offset < week3) {
                    status = ContextStatusType.REPEATED;
                }
                return new ContextStatusDto(status, Math.ceil((week3 - offset) / 24), ContextTimeUnit.DAY);
            case 4:
                offset = offset / 60;
                var month3 = 24 * 7 * 4 * 3;
                if (offset < month3) {
                    status = ContextStatusType.REPEATED;
                }
                return new ContextStatusDto(status, Math.ceil((month3 - offset) / 24), ContextTimeUnit.DAY);
            default:
                return new ContextStatusDto(ContextStatusType.STUDIED, 0, ContextTimeUnit.NONE);
        }
    }

}
