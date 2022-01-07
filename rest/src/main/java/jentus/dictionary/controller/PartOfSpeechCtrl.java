package jentus.dictionary.controller;

import jentus.dictionary.model.PartOfSpeech;
import jentus.dictionary.model.dto.PartOfSpeechDto;
import jentus.dictionary.service.PartOfSpeechService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@AllArgsConstructor
public class PartOfSpeechCtrl {

    private final PartOfSpeechService partOfSpeechService;

    @GetMapping("/PartOfSpeech")
    public List<PartOfSpeechDto> findAll() {
        return partOfSpeechService.findAll();
    }

}
