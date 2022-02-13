package jentus.dictionary.controller;

import jentus.dictionary.exception.ContextNotFoundException;
import jentus.dictionary.model.*;
import jentus.dictionary.model.dto.ContextDtoReader;
import jentus.dictionary.model.dto.ContextDtoWriter;
import jentus.dictionary.model.dto.ContextListDto;
import jentus.dictionary.service.ContextListService;
import jentus.dictionary.service.ContextService;
import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;


@CrossOrigin("http://localhost:3000")
@RestController
@AllArgsConstructor
public class ContextListCtrl {

    private final ContextListService contextListService;
    private final ContextService contextService;

    @GetMapping("/ContextList/{contextListId}/Context/{contextId}")
    public ContextDtoReader findByContextId(
            @PathVariable("contextListId") long contextListId,
            @PathVariable("contextId") long contextId
    ) throws ContextNotFoundException {
        return contextService.findById(contextId);
    }

    @GetMapping("/ContextList")
    @ResponseBody
    public List<ContextListDto> findAll() {
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
    public List<ContextDtoReader> findAll(
            @RequestParam(name = "limit") int limit,
            @RequestParam(name = "offset") int offset,
            @RequestParam(name = "contextListIds[]", required = false) List<Long> contextListIds,
            @RequestParam(name = "isUnionAll", required = false, defaultValue = "false") boolean isUnionAll,
            @RequestParam(name = "sortByField", required = false) ContextSortField sortByField,
            @RequestParam(name = "sortByOrder", required = false) ContextSortType sortByOrder
    ) {
        ContextParams contextParams = new ContextParams();
        contextParams.setLimit(limit);
        contextParams.setOffset(offset);
        contextParams.setContextListIds(contextListIds);
        contextParams.setUnionAll(isUnionAll);
        contextParams.setContextSortField(sortByField);
        contextParams.setContextSortType(sortByOrder);

        return contextService.findByParams(contextParams);
    }

    @GetMapping("ContextList/{contextListId}/Context")
    public List<ContextDtoReader> findContextByContextListId(
            @PathVariable("contextListId") long contextListId,
            @RequestParam(value = "status",required = false) ContextStatusType status
    ) {
        return contextListService.findContextByContextListIdAndStatus(contextListId,status);
    }

    @PostMapping("ContextList/{contextListId}/Context")
    public void saveContextByContextListId(
            @PathVariable("contextListId") long contextListId,
            @RequestBody ContextDtoWriter contextDtoWriter
    ) {
        contextListService.saveContextByContextListId(contextListId,contextDtoWriter);
    }


//    @GetMapping("ContextList/{contextListId}/Context/{contextId}")
//    public void action(
//            @PathVariable("contextListId") long contextListId,
//            @PathVariable("contextId") long contextId,
//            @RequestParam(name = "action") ContextListAction action
//    ) {
//        switch (action) {
//            case ATTACH:
//                contextListService.attachToList(contextListId, contextId);
//                break;
//            case DETACH:
//                contextListService.detachFromList(contextListId, contextId);
//                break;
//        }
//    }

    @GetMapping("ContextList/{contextListId}/Context/ContextStatus")
    public List<ContextDtoReader> findContextByContextListIdWithStatus(
            @PathVariable("contextListId") long contextListId,
            @RequestParam(name = "limit") long limit,
            @RequestParam(name = "status") List<ContextStatusType> statusTypeList
    ) {
        return contextListService.findContextByStatusList(contextListId, limit, statusTypeList);
    }
}
