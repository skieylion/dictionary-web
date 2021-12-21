package jentus.dictionary.service;

import jentus.dictionary.model.PartOfSpeech;

import java.util.List;

public interface PartOfSpeechService {
    List<PartOfSpeech> findAll();
}
