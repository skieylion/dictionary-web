package jentus.vocabulary.controller;

import jentus.vocabulary.model.Meaning;
import jentus.vocabulary.model.Sets;
import jentus.vocabulary.service.ServiceMeaning;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@AllArgsConstructor
public class MeaningController {
    private final ServiceMeaning serviceMeaning;

    @GetMapping("/meaning/set")
    public List<Meaning> findBySets(@RequestParam(name="isUnionAll",required=false) boolean isUnionAll ,@RequestParam(name="ids[]",required = false) List<Long> ids) {
        if(ids!=null&&ids.size()>0) {
            return serviceMeaning.findBySets(isUnionAll,ids);
        }
        return new ArrayList<>();
    }

    @GetMapping("/meaning")
    public List<Meaning> findAll() {
        return serviceMeaning.findAll();
    }

    @DeleteMapping("/meaning/{id}")
    public void delete(@PathVariable("id") long id) {
        serviceMeaning.delete(id);
    }


}
