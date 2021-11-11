package jentus.vocabulary.controller;

import jentus.vocabulary.service.RepeaterService;
import jentus.vocabulary.service.ServiceContext;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class RepeaterController {

    private final RepeaterService repeaterService;

    @PostMapping("/repeater/context/{contextId}")
    public void save(@PathVariable("contextId") long contextId) {
        repeaterService.save(contextId);
    }
}
