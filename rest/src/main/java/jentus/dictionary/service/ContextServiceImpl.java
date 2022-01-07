package jentus.dictionary.service;

import jentus.dictionary.exception.ContextNotFoundException;
import jentus.dictionary.model.*;
import jentus.dictionary.model.dto.ContextDtoReader;
import jentus.dictionary.repository.ContextAndContextListRepository;
import jentus.dictionary.repository.ContextRepository;
import jentus.dictionary.service.converter.ContextToContextDtoConverter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ContextServiceImpl implements ContextService {

    private final ContextRepository contextRepository;
    private final ContextAndContextListRepository contextAndContextListRepository;
    private final ContextToContextDtoConverter contextToContextDtoConverter;

    @Override
    public List<Context> findAllByListId(List<Long> listId) {
        return contextRepository.findAllByListId(listId);
    }


    @Override
    public ContextDtoReader findById(long id) throws ContextNotFoundException {
        Context context=contextRepository.findById(id).orElseThrow(ContextNotFoundException::new);
        return contextToContextDtoConverter.convert(context);
    }

    @Override
    public void delete(long id) {
        contextRepository.deleteById(id);
    }

    @Override
    public List<ContextDtoReader> findByParams(ContextParams contextParams) {
        List<ContextDtoReader> contextDtoReaderList = new ArrayList<>();

        List<ContextDb> contextDbList = contextRepository.findByParams(contextParams);
        if (contextDbList.size() > 0) {
            List<Long> listId = new ArrayList<>();
            contextDbList.forEach(contextDb -> {
                listId.add(contextDb.getId());
            });
            List<Context> contextList = contextRepository.findAllByListId(listId);
            contextDbList.forEach(contextDb -> {
                contextList.forEach(context -> {
                    if (context.getId() == contextDb.getId()) {
                        contextDtoReaderList.add(contextToContextDtoConverter.convert(context));
                    }
                });
            });
        }

        return contextDtoReaderList;
    }





}
