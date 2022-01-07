package jentus.dictionary.service.converter;

import jentus.dictionary.model.PartOfSpeech;
import jentus.dictionary.model.dto.PartOfSpeechDto;
import org.springframework.stereotype.Service;

import javax.servlet.http.Part;

@Service
public class PartOfSpeechToPartOfSpeechDtoConverterImpl implements PartOfSpeechToPartOfSpeechDtoConverter {

    @Override
    public PartOfSpeechDto convert(PartOfSpeech partOfSpeech) {
        return new PartOfSpeechDto(partOfSpeech.getId(),partOfSpeech.getName());
    }
}
