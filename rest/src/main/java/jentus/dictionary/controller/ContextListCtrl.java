package jentus.dictionary.controller;

import jentus.dictionary.model.ContextList;
import jentus.dictionary.model.ContextParams;
import jentus.dictionary.model.ContextSortField;
import jentus.dictionary.model.dto.ContextDto;
import jentus.dictionary.service.ContextListService;
import jentus.dictionary.service.ServiceContext;
import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;


@RestController
@AllArgsConstructor
public class ContextListCtrl {

    private final ContextListService contextListService;
    private final ServiceContext serviceContext;

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

    @GetMapping("ContextList/Context")
    public List<ContextDto> findAll(
            @RequestParam(name = "limit") int limit,
            @RequestParam(name = "offset") int offset,
            @RequestParam(name = "contextListIds[]", required = false) List<Long> contextListIds,
            @RequestParam(name = "isUnionAll",required = false,defaultValue = "false") boolean isUnionAll,
            @RequestParam(name = "sortByField", required = false) ContextSortField sortByField,
            @RequestParam(name = "sortByOrder", required = false) Boolean sortByOrder
    ) {
        ContextParams contextParams=new ContextParams();
        contextParams.setLimit(limit);
        contextParams.setOffset(offset);
        contextParams.setContextListIds(contextListIds);
        contextParams.setUnionAll(isUnionAll);
        contextParams.setContextSortField(sortByField);
        contextParams.setIsDesc(sortByOrder);

        return serviceContext.findByParams(contextParams);
    }
    @GetMapping("ContextList/{id}/Context")
    public List<ContextDto> findContextByContextListId(
            @PathVariable("id") long id,
            @RequestParam(name = "limit") int limit,
            @RequestParam(name = "offset") int offset,
            @RequestParam(name = "sortByField", required = false) ContextSortField sortByField,
            @RequestParam(name = "sortByOrder", required = false) Boolean sortByOrder
    ) {
        List<Long> contextListIds= Collections.singletonList(id);
        ContextParams contextParams=new ContextParams();
        contextParams.setLimit(limit);
        contextParams.setOffset(offset);
        contextParams.setUnionAll(false);
        contextParams.setContextListIds(contextListIds);
        contextParams.setContextSortField(sortByField);
        contextParams.setIsDesc(sortByOrder);

        return serviceContext.findByParams(contextParams);
    }

}
