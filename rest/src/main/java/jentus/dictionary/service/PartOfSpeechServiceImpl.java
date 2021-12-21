package jentus.dictionary.service;

import jentus.dictionary.model.PartOfSpeech;
import jentus.dictionary.repository.PartOfSpeechRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class PartOfSpeechServiceImpl implements PartOfSpeechService {

    private final PartOfSpeechRepository partOfSpeechRepository;


    @Override
    public List<PartOfSpeech> findAll() {
        return partOfSpeechRepository.findAll();
    }

}
