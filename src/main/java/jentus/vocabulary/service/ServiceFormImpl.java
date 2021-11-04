package jentus.vocabulary.service;

import jentus.vocabulary.model.*;
import jentus.vocabulary.repository.FormRepository;
import jentus.vocabulary.repository.LexemeRepository;
import jentus.vocabulary.repository.SetsRepository;
import jentus.vocabulary.repository.TypeFormRepository;
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

    @Transactional
    public void save(FormDto formDto) {
        Form form = new Form();
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


        List<Meaning> meaningList = new ArrayList<>();
        formDto.getMeaningDtoList().forEach(meaningDto -> {
            Meaning meaning = new Meaning();
            meaning.setForm(form);
            meaning.setSets(setsToBase);
            meaning.setDef(meaningDto.getDef());
            meaning.setTranslate(meaningDto.getTranslate());
            List<Example> exampleList = new ArrayList<>();
            meaningDto.getExampleDtoList().forEach(exampleDto -> {
                Example example = new Example();
                example.setText(exampleDto.getText());
                example.setMeaning(meaning);
                exampleList.add(example);
            });
            meaning.setExamples(exampleList);
            meaningList.add(meaning);
        });
        form.setMeanings(meaningList);
        formRepository.save(form);
        //добавить слова к наборам


    }

    @Override
    public List<Form> findAll() {
        return formRepository.findAll();
    }

}
