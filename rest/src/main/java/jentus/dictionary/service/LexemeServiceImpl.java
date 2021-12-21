package jentus.dictionary.service;

import jentus.dictionary.model.*;
import jentus.dictionary.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Service
@AllArgsConstructor
public class LexemeServiceImpl implements LexemeService {

    private final LexemeRepository lexemeRepository;
    private final PartOfSpeechRepository partOfSpeechRepository;
    private final ContextListRepository contextListRepository;
    private final FileTableRepository fileTableRepository;

    private String getUUID(){
        return UUID.randomUUID().toString();
    }

    //@Transactional
    public void save2(FormDto formDto) {
        FileTable fileTable=formDto.getAudioFile();
//        if(fileTable!=null&&!(fileTable.getUid()!=null&&fileTable.getUid()!="")){
//            fileTable.setUid(getUUID());
//        }

        Lexeme lexeme = new Lexeme();
        Long id=formDto.getId();
        if(id!=null) lexeme.setId(id);

        //lexeme.setAudioFile(fileTable);
        lexeme.setValue(formDto.getValue());
        lexeme.setMeta(formDto.getMeta());
        //lexeme.setTranscription(formDto.getTranscription());

        long typeId = formDto.getTypeId();
        //partOfSpeechRepository.findById(typeId).ifPresent(lexeme::setType);
        long lexemeId = formDto.getLexemeId();
        if (lexemeId > 0) {
            //lexemeRepository.findById(lexemeId).ifPresent(form::setLexeme);
        }

        Set<ContextList> contextListToBase =new HashSet<>();
        Set<ContextList> contextListFromForm =new HashSet<>(formDto.getSets());
        for (ContextList contextList : contextListFromForm) {
            contextListRepository.findById(contextList.getId()).ifPresent(contextListToBase::add);
        }


        List<Context> contextList = new ArrayList<>();
        formDto.getContextDtoList().forEach(meaningDto -> {
            Context context = new Context();
            //context.setLexeme(lexeme);

            if(meaningDto.getId()!=null) context.setId(meaningDto.getId());
            context.setPhotoFile(meaningDto.getPhotoFile());
//            if(context.getPhotoFile()!=null&&(context.getPhotoFile().getUid()==null || context.getPhotoFile().getUid().equals(""))){
//                context.getPhotoFile().setUid(getUUID());
//            }

//            context.setSets(contextListToBase);
//            context.setDef(meaningDto.getDef());
            context.setTranslate(meaningDto.getTranslate());
            List<Example> exampleList = new ArrayList<>();
            meaningDto.getExampleDtoList().forEach(exampleDto -> {
                Example example = new Example();
                example.setText(exampleDto.getText());
                if(exampleDto.getId()!=null) example.setId(exampleDto.getId());
                example.setContext(context);
                exampleList.add(example);
            });
            //context.setExamples(exampleList);
            contextList.add(context);
        });
        //lexeme.setContexts(contextList);
        lexemeRepository.save(lexeme);
        //добавить слова к наборам


    }


    @Override
    @Transactional
    public void save(Lexeme lexeme) {
        lexemeRepository.save(lexeme);
    }

    @Override
    public List<Lexeme> findAll() {
        return lexemeRepository.findAll();
    }

}
