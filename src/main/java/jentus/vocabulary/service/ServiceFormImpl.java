package jentus.vocabulary.service;

import jentus.vocabulary.model.Example;
import jentus.vocabulary.model.Form;
import jentus.vocabulary.model.FormDto;
import jentus.vocabulary.model.Meaning;
import jentus.vocabulary.repository.FormRepository;
import jentus.vocabulary.repository.LexemeRepository;
import jentus.vocabulary.repository.TypeFormRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Service
@AllArgsConstructor
public class ServiceFormImpl implements ServiceForm {

    private final FormRepository formRepository;
    private final TypeFormRepository typeFormRepository;
    private final LexemeRepository lexemeRepository;

    @Transactional
    public void save(FormDto formDto) {
        Form form = new Form();
        form.setValue(formDto.getValue());
        form.setMeta(formDto.getMeta());
        long typeId = formDto.getTypeId();
        typeFormRepository.findById(typeId).ifPresent(form::setType);
        long lexemeId = formDto.getLexemeId();
        if (lexemeId > 0) {
            lexemeRepository.findById(lexemeId).ifPresent(form::setLexeme);
        }
        List<Meaning> meaningList = new ArrayList<>();
        formDto.getMeaningDtoList().forEach(meaningDto -> {
            Meaning meaning = new Meaning();
            meaning.setForm(form);
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
    }
}
