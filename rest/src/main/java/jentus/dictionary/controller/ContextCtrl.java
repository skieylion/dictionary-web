package jentus.dictionary.controller;

import jentus.dictionary.exception.ContextNotFoundException;
import jentus.dictionary.exception.ContextStatusNotFoundException;
import jentus.dictionary.exception.ContextStatusNotSetException;
import jentus.dictionary.model.Context;
import jentus.dictionary.model.ContextStatusType;
import jentus.dictionary.service.ContextStatusService;
import jentus.dictionary.service.ServiceContext;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class ContextCtrl {
    private final ContextStatusService contextStatusService;
    private final ServiceContext serviceContext;

    @PostMapping("/Context/{id}/ContextStatus/{status}")
    public void setStatus(@PathVariable("id") long contextId, @PathVariable("status") String status) throws ContextStatusNotSetException, ContextStatusNotFoundException {
        contextStatusService.setStatus(contextId, ContextStatusType.valueOf(status));
    }
    @DeleteMapping("/Context/{id}")
    public void delete(@PathVariable("id") long id) {
        serviceContext.delete(id);
    }
    @GetMapping("/Context/{id}")
    public Context findById(@PathVariable("id") long id) throws ContextNotFoundException {
        return serviceContext.findById(id);
    }

}
