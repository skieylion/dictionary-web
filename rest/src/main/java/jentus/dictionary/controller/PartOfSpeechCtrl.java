package jentus.dictionary.controller;

import jentus.dictionary.model.PartOfSpeech;
import jentus.dictionary.service.PartOfSpeechService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
public class PartOfSpeechCtrl {

    private final PartOfSpeechService partOfSpeechService;

    @GetMapping("/PartOfSpeech")
    @ResponseBody
    public List<PartOfSpeech> findAll() {
        return partOfSpeechService.findAll();
    }

}
