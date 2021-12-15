package jentus.dictionary.controller;

import jentus.dictionary.model.TypeForm;
import jentus.dictionary.service.ServiceTypeForm;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@AllArgsConstructor
public class TypeFormController {

    private final ServiceTypeForm serviceTypeForm;

    @GetMapping("/typeform")
    @ResponseBody
    public List<TypeForm> findAll() {
        return serviceTypeForm.findAll();
    }

}
