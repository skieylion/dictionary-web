package jentus.dictionary.service.converter;

import jentus.dictionary.model.PartOfSpeech;
import jentus.dictionary.model.dto.PartOfSpeechDto;

public interface PartOfSpeechToPartOfSpeechDtoConverter {
    PartOfSpeechDto convert(PartOfSpeech partOfSpeech);
}
