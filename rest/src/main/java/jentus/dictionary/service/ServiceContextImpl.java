package jentus.dictionary.service;

import jentus.dictionary.controller.ContextController;
import jentus.dictionary.exception.ContextNotFoundException;
import jentus.dictionary.model.*;
import jentus.dictionary.model.dto.ContextDto;
import jentus.dictionary.model.dto.ExampleDto;
import jentus.dictionary.repository.ContextEventRepository;
import jentus.dictionary.repository.ContextRepository;
import jentus.dictionary.repository.ContextListRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
public class ServiceContextImpl implements ServiceContext {

    private final ContextRepository contextRepository;
    private final ContextEventRepository contextEventRepository;
    private final ContextStatusService contextStatusService;

    private final ContextListRepository contextListRepository;
    private final ContextToContextDtoConverter contextToContextDtoConverter;

    @Override
    public List<ContextDto> findAll() {
        return contextRepository.findAll();
    }

    @Override
    public List<Context> findAllByListId(List<Long> listId) {
        return contextRepository.findAllByListId(listId);
    }


    @Override
    public ContextDto findById(long id) throws ContextNotFoundException {
        ContextDto contextDto = new ContextDto();
//
//        contextRepository.findById(id).ifPresent(context -> {
//            contextDto.setId(context.getId());
//            contextDto.setDefinition(context.getDefinition());
//            contextDto.setPhotoFile(context.getPhotoFile());
//            contextDto.setTranslate(context.getTranslate());
//            List<ExampleDto> exampleDtoList=new ArrayList<>();
//            context.getExamples().forEach(example -> {
//                ExampleDto exampleDto=new ExampleDto();
//                exampleDto.setId(example.getId());
//                exampleDto.setText(example.getText());
//                exampleDtoList.add(exampleDto);
//            });
//            contextDto.setExampleDtoList(exampleDtoList);
//        });

        return contextDto;

        //return contextRepository.findById(id).orElseThrow(ContextNotFoundException::new);
    }

    @Override
    public void delete(long id) {
        contextRepository.deleteById(id);
    }

    @Override
    public List<ContextDto> findByParams(ContextParams contextParams) {
        List<ContextDto> contextDtoList = new ArrayList<>();

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
                        contextDtoList.add(contextToContextDtoConverter.convert(context));
                    }
                });
            });
        }

        return contextDtoList;
    }



    @Override
    public void attachToSet(long contextId, long setId) {
//        contextRepository.findById(contextId).ifPresent(context -> {
//            contextListRepository.findById(setId).ifPresent(sets -> {
//                if (!context.getSets().contains(sets)) {
//                    context.getSets().add(sets);
//                    contextRepository.save(context);
//                }
//            });
//        });
    }

    @Override
    @Transactional
    public void detachFromSet(long contextId, long setId) {
        contextRepository.findById(contextId).ifPresent(context -> {
            contextListRepository.findById(setId).ifPresent(sets -> {
                contextRepository.detachContextFromSet(contextId, setId);
            });
        });
    }
}
