package jentus.vocabulary.controller;

import jentus.vocabulary.model.Sets;
import jentus.vocabulary.model.TypeForm;
import jentus.vocabulary.repository.TypeFormRepository;
import jentus.vocabulary.service.ServiceSets;
import jentus.vocabulary.service.ServiceTypeForm;
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
