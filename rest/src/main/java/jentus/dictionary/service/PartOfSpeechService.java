package jentus.dictionary.service;

import jentus.dictionary.model.PartOfSpeech;
import jentus.dictionary.model.dto.PartOfSpeechDto;

import java.util.List;

public interface PartOfSpeechService {
    List<PartOfSpeechDto> findAll();
}
