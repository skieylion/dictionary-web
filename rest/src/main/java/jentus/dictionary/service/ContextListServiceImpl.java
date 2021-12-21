package jentus.dictionary.service;

import jentus.dictionary.model.Context;
import jentus.dictionary.model.ContextAndContextList;
import jentus.dictionary.model.ContextList;
import jentus.dictionary.model.ContextStatusType;
import jentus.dictionary.model.dto.ContextDto;
import jentus.dictionary.repository.ContextAndContextListRepository;
import jentus.dictionary.repository.ContextListRepository;
import jentus.dictionary.repository.ContextRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ContextListServiceImpl implements ContextListService {

    private final ContextListRepository contextListRepository;
    private final ContextAndContextListRepository contextAndContextListRepository;
    private final ContextRepository contextRepository;
    private final ContextToContextDtoConverter contextToContextDtoConverter;

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

    @Override
    public void attachToList(long contextListId, long contextId) {
        contextAndContextListRepository
                .findByContextIdAndContextListId(contextId, contextListId)
                .ifPresentOrElse(contextAndContextList -> {
                }, () -> {
                    contextRepository.findById(contextId).ifPresent(context -> {
                        contextListRepository.findById(contextListId).ifPresent(contextList -> {
                            ContextAndContextList contextAndContextList = new ContextAndContextList();
                            contextAndContextList.setContext(context);
                            contextAndContextList.setContextList(contextList);
                            contextAndContextListRepository.save(contextAndContextList);
                        });
                    });
                });
    }

    @Override
    @Transactional
    public void detachFromList(long contextListId, long contextId) {
        contextAndContextListRepository
                .findByContextIdAndContextListId(contextId, contextListId)
                .ifPresent(contextAndContextListRepository::delete);
    }

    @Override
    public List<ContextDto> findContextByStatusList(long contextListId, long limit, List<ContextStatusType> contextStatusTypeList) {
        List<ContextDto> contextDtoList = new ArrayList<>();
        contextAndContextListRepository
                .findByContextListId(contextListId)
                .ifPresent(contextAndContextList -> {
                    Context context = contextAndContextList.getContext();
                    ContextDto contextDto = contextToContextDtoConverter.convert(context);
                    contextDtoList.add(contextDto);
                });

        List<ContextDto> contextDtoListResult = new ArrayList<>();

        for (var status : contextStatusTypeList) {
            for (var contextDto : contextDtoList) {
                if (contextDto.getStatus().getContextStatusType() == status) {
                    if(contextDtoListResult.size()<limit) {
                        contextDtoListResult.add(contextDto);
                    } else {
                        return contextDtoListResult;
                    }
                }
            }
        }

        return contextDtoListResult;
    }
}
