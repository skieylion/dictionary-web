package jentus.dictionary.controller;

import jentus.dictionary.model.Lexeme;
import jentus.dictionary.model.FormDto;
import jentus.dictionary.service.LexemeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class LexemeCtrl {

    private final LexemeService lexemeService;

    @PostMapping("/Lexeme")
    public void save(@RequestBody Lexeme lexeme) {
        lexemeService.save(lexeme);
    }

    @GetMapping("/Lexeme") // ?
    public List<Lexeme> findAll() {
        return lexemeService.findAll();
    }
}
