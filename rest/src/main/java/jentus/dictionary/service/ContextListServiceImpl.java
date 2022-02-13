package jentus.dictionary.service;

import jentus.dictionary.model.*;
import jentus.dictionary.model.dto.ContextDtoReader;
import jentus.dictionary.model.dto.ContextDtoWriter;
import jentus.dictionary.model.dto.ContextListDto;
import jentus.dictionary.repository.*;
import jentus.dictionary.service.converter.ContextListToContextListDtoConverter;
import jentus.dictionary.service.converter.ContextToContextDtoConverter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ContextListServiceImpl implements ContextListService {

    private final ContextListRepository contextListRepository;
    private final ContextAndContextListRepository contextAndContextListRepository;
    private final ContextRepository contextRepository;
    private final ContextToContextDtoConverter contextToContextDtoConverter;
    private final ContextListToContextListDtoConverter contextListToContextListDtoConverter;
    private final ExpressionRepository expressionRepository;
    private final PartOfSpeechRepository partOfSpeechRepository;
    private final ExpressionAndPartOfSpeechRepository expressionAndPartOfSpeechRepository;
    private final ContextStatusService contextStatusService;


    @Override
    @Transactional
    public void save(ContextList contextList) {
        contextListRepository.save(contextList);
    }

    @Override
    public List<ContextListDto> findAll() {
        List<ContextListDto> contextListDtoList = new ArrayList<>();
        contextListRepository.findAll().forEach(contextList -> {
            contextListDtoList.add(contextListToContextListDtoConverter.convert(contextList));
        });
        return contextListDtoList;
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
    @Transactional
    public void saveContextByContextListId(long contextListId, ContextDtoWriter contextDtoWriter) {

        contextListRepository.findById(contextListId).ifPresent(contextList -> {
            Context context = new Context();
            context.setDefinition(contextDtoWriter.getDefinition());
            context.setTranslate(contextDtoWriter.getTranslate());
            context.setPhotoId(UUID.fromString(contextDtoWriter.getPhotoId()));

            partOfSpeechRepository.findById(contextDtoWriter.getPartOfSpeechId()).ifPresent(context::setPartOfSpeech);

            expressionRepository
                    .findByValue(contextDtoWriter.getExpressionValue())
                    .ifPresentOrElse(context::setExpression, () -> {
                        Expression expression = new Expression();
                        expression.setValue(contextDtoWriter.getExpressionValue());
                        expressionRepository.save(expression);
                        context.setExpression(expression);
                    });

            ExpressionAndPartOfSpeech expressionAndPartOfSpeech = new ExpressionAndPartOfSpeech(context.getExpression(), context.getPartOfSpeech());
            expressionAndPartOfSpeechRepository.save(expressionAndPartOfSpeech);

            context.setExamples(new ArrayList<>());
            contextDtoWriter.getExampleList().forEach(str -> {
                Example example = new Example();
                example.setContext(context);
                example.setText(str);
                context.getExamples().add(example);
            });

            context.setContextLists(new HashSet<>());
            context.getContextLists().add(contextList);

            contextRepository.save(context);

        });
    }

    @Override
    public List<ContextDtoReader> findContextByContextListIdAndStatus(long contextListId, ContextStatusType status) {
        List<ContextDtoReader> contextDtoReaderList = new ArrayList<>();
        contextListRepository.findById(contextListId).ifPresent(contextList -> {
            contextList.getContexts().forEach(context -> {
                if (status != null && status != ContextStatusType.ANY) {
                    var currentStatus = contextStatusService.getContextStatusDtoByContext(context).getContextStatusType();
                    if (status.equals(currentStatus)) {
                        contextDtoReaderList.add(contextToContextDtoConverter.convert(context));
                    }
                } else {
                    contextDtoReaderList.add(contextToContextDtoConverter.convert(context));
                }
            });
        });
        return contextDtoReaderList;
    }

    @Override
    public List<ContextDtoReader> findContextByStatusList(long contextListId, long limit, List<ContextStatusType> contextStatusTypeList) {
        List<ContextDtoReader> contextDtoReaderList = new ArrayList<>();
        contextAndContextListRepository
                .findByContextListId(contextListId)
                .ifPresent(contextAndContextList -> {
                    Context context = contextAndContextList.getContext();
                    ContextDtoReader contextDtoReader = contextToContextDtoConverter.convert(context);
                    contextDtoReaderList.add(contextDtoReader);
                });

        List<ContextDtoReader> contextDtoReaderListResult = new ArrayList<>();

        for (var status : contextStatusTypeList) {
            for (var contextDto : contextDtoReaderList) {
                if (contextDto.getStatus().getContextStatusType() == status) {
                    if (contextDtoReaderListResult.size() < limit) {
                        contextDtoReaderListResult.add(contextDto);
                    } else {
                        return contextDtoReaderListResult;
                    }
                }
            }
        }

        return contextDtoReaderListResult;
    }
}
