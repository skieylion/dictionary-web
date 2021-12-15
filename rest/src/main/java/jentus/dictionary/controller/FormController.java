package jentus.dictionary.controller;

import jentus.dictionary.model.Form;
import jentus.dictionary.model.FormDto;
import jentus.dictionary.service.ServiceForm;
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
