package jentus.vocabulary.controller;

import jentus.vocabulary.model.FormDto;
import jentus.vocabulary.model.Sets;
import jentus.vocabulary.service.ServiceForm;
import jentus.vocabulary.service.ServiceSets;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
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
