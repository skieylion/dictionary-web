package jentus.vocabulary.service;

import jentus.vocabulary.model.*;
import jentus.vocabulary.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


@Service
@AllArgsConstructor
public class ServiceFormImpl implements ServiceForm {

    private final FormRepository formRepository;
    private final TypeFormRepository typeFormRepository;
    private final LexemeRepository lexemeRepository;
    private final SetsRepository setsRepository;
    private final FileTableRepository fileTableRepository;

    private String getUUID(){
        return UUID.randomUUID().toString();
    }

    @Transactional
    public void save(FormDto formDto) {
        FileTable fileTable=formDto.getAudioFile();
        if(fileTable!=null&&!(fileTable.getUid()!=null&&fileTable.getUid()!="")){
            fileTable.setUid(getUUID());
        }

        Form form = new Form();
        Long id=formDto.getId();
        if(id!=null) form.setId(id);

        form.setAudioFile(fileTable);
        form.setValue(formDto.getValue());
        form.setMeta(formDto.getMeta());
        form.setTranscription(formDto.getTranscription());

        long typeId = formDto.getTypeId();
        typeFormRepository.findById(typeId).ifPresent(form::setType);
        long lexemeId = formDto.getLexemeId();
        if (lexemeId > 0) {
            lexemeRepository.findById(lexemeId).ifPresent(form::setLexeme);
        }

        Set<Sets> setsToBase=new HashSet<>();
        Set<Sets> setsFromForm=new HashSet<>(formDto.getSets());
        for (Sets sets : setsFromForm) {
            setsRepository.findById(sets.getId()).ifPresent(setsToBase::add);
        }


        List<Context> contextList = new ArrayList<>();
        formDto.getContextDtoList().forEach(meaningDto -> {
            Context context = new Context();
            context.setForm(form);

            if(meaningDto.getId()!=null) context.setId(meaningDto.getId());
            context.setPhotoFile(meaningDto.getPhotoFile());
            if(context.getPhotoFile()!=null&&(context.getPhotoFile().getUid()==null || context.getPhotoFile().getUid().equals(""))){
                context.getPhotoFile().setUid(getUUID());
            }

            context.setSets(setsToBase);
            context.setDef(meaningDto.getDef());
            context.setTranslate(meaningDto.getTranslate());
            List<Example> exampleList = new ArrayList<>();
            meaningDto.getExampleDtoList().forEach(exampleDto -> {
                Example example = new Example();
                example.setText(exampleDto.getText());
                if(exampleDto.getId()!=null) example.setId(exampleDto.getId());
                example.setContext(context);
                exampleList.add(example);
            });
            context.setExamples(exampleList);
            contextList.add(context);
        });
        form.setContexts(contextList);
        formRepository.save(form);
        //добавить слова к наборам


    }

    @Override
    public List<Form> findAll() {
        return formRepository.findAll();
    }

}
