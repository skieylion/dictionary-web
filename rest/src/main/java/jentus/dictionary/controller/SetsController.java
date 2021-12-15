package jentus.dictionary.controller;

import jentus.dictionary.model.Sets;
import jentus.dictionary.service.ServiceSets;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
public class SetsController {

    private final ServiceSets serviceSets;

    @PostMapping("/sets")
    public void save(@RequestBody Sets sets) {
        serviceSets.save(sets);
    }
    @GetMapping("/sets")
    @ResponseBody
    public List<Sets> findAll() {
        return serviceSets.findAll();
    }
    @DeleteMapping("/sets/{id}")
    public void delete(@PathVariable("id") long id) {
        serviceSets.delete(id);
    }
}
