package jentus.dictionary.controller;

import jentus.dictionary.exception.ContextNotFoundException;
import jentus.dictionary.exception.ContextStatusNotFoundException;
import jentus.dictionary.exception.ContextStatusNotSetException;
import jentus.dictionary.model.ContextParams;
import jentus.dictionary.model.ContextSortField;
import jentus.dictionary.model.dto.ContextDto;
import jentus.dictionary.model.ContextStatusType;
import jentus.dictionary.service.ContextStatusService;
import jentus.dictionary.service.ServiceContext;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ContextDto findById(@PathVariable("id") long id) throws ContextNotFoundException {
        return serviceContext.findById(id);
    }

    @GetMapping("/Context")
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


}
