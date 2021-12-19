package jentus.dictionary.controller;

import jentus.dictionary.model.ContextList;
import jentus.dictionary.service.ContextListService;
import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
public class ContextListCtrl {

    private final ContextListService contextListService;

    @GetMapping("/ContextList")
    @ResponseBody
    public List<ContextList> findAll() {
        return contextListService.findAll();
    }

    @PostMapping("/ContextList")
    @Transactional
    public void save(@RequestBody ContextList contextList) {
        contextListService.save(contextList);
    }

    @DeleteMapping("/ContextList/{id}")
    @Transactional
    public void delete(@PathVariable("id") long id) {
        contextListService.delete(id);
    }
}
