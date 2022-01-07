package jentus.dictionary.service;

import jentus.dictionary.model.PartOfSpeech;
import jentus.dictionary.model.dto.PartOfSpeechDto;
import jentus.dictionary.repository.PartOfSpeechRepository;
import jentus.dictionary.service.converter.PartOfSpeechToPartOfSpeechDtoConverter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class PartOfSpeechServiceImpl implements PartOfSpeechService {

    private final PartOfSpeechRepository partOfSpeechRepository;
    private final PartOfSpeechToPartOfSpeechDtoConverter partOfSpeechToPartOfSpeechDtoConverter;


    @Override
    public List<PartOfSpeechDto> findAll() {
        List<PartOfSpeechDto> partOfSpeechDtoList=new ArrayList<>();
        partOfSpeechRepository.findAll().forEach(partOfSpeech -> {
            partOfSpeechDtoList.add(partOfSpeechToPartOfSpeechDtoConverter.convert(partOfSpeech));
        });
        return partOfSpeechDtoList;
    }

}
