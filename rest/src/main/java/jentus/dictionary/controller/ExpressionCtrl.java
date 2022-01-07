package jentus.dictionary.controller;

import jentus.dictionary.model.Expression;
import jentus.dictionary.service.ExpressionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@AllArgsConstructor
public class ExpressionCtrl {

    private final ExpressionService expressionService;

    @PostMapping("/Expression")
    public void save(@RequestBody Expression expression) {
        expressionService.save(expression);
    }

    @GetMapping("/Expression") // ?
    public List<Expression> findAll() {
        return expressionService.findAll();
    }
}
