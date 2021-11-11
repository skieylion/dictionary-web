package jentus.vocabulary.controller;

import jentus.vocabulary.model.Context;
import jentus.vocabulary.service.ServiceContext;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
public class ContextController {
    private final ServiceContext serviceContext;

    @GetMapping("/context/set")
    public List<Context> findBySets(@RequestParam(name="isUnionAll",required=false) boolean isUnionAll , @RequestParam(name="ids[]",required = false) List<Long> ids) {
        if(ids!=null&&ids.size()>0) {
            return serviceContext.findBySets(isUnionAll,ids);
        }
        return new ArrayList<>();
    }

    @GetMapping("/context")
    public List<Context> findAll() {
        return serviceContext.findAll();
    }

    @DeleteMapping("/context/{id}")
    public void delete(@PathVariable("id") long id) {

        serviceContext.delete(id);
    }


}
