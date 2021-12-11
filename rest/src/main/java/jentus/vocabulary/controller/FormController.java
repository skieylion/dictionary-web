package jentus.vocabulary.controller;

import jentus.vocabulary.model.Form;
import jentus.vocabulary.model.FormDto;
import jentus.vocabulary.model.TypeForm;
import jentus.vocabulary.repository.TypeFormRepository;
import jentus.vocabulary.service.ServiceForm;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class FormController {

    private final ServiceForm serviceForm;

    @PostMapping("/form")
    public void save(@RequestBody FormDto form) {
        serviceForm.save(form);
    }

    @GetMapping("/form")
    public List<Form> findAll() {
        return serviceForm.findAll();
    }
}
