package jentus.dictionary.controller;

import jentus.dictionary.model.*;
import jentus.dictionary.service.ServiceContext;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@AllArgsConstructor
public class ContextController {
    private final ServiceContext serviceContext;

    private List<OrderTable> getOrderList(Map<String, String> map) {

        List<OrderTable> orderTableList = new ArrayList<>();
        orderTableList.add(new OrderTable());

        map.forEach((name, value) -> {
            if (name.matches("order\\[.*\\]\\[.*\\]")) {
                System.out.println(name);
                System.out.println(value);
                OrderTable buffer = orderTableList.get(orderTableList.size() - 1);

                if (name.contains("[column]")) {
                    Integer column = Integer.valueOf(value);
                    buffer.setColumn(column);

                } else if (name.contains("[dir]")) {
                    buffer.setDir(value);
                }

                if (buffer.getColumn() != null && buffer.getDir() != null) {
                    orderTableList.add(new OrderTable());
                }
            }
        });
        orderTableList.remove(orderTableList.size() - 1);

        return orderTableList;
    }

    private static class ContextStatus {
        private String state;
        private Double offset;
        private String unit;
        private Integer count;
    }



    private String getStatus(Context context) {
        ContextStatus contextStatus = getContextStatus(context);
        switch (contextStatus.state) {
            case "repeated":
                return "через " + String.valueOf(contextStatus.offset) + contextStatus.unit;
            case "repeat":
                return "повторить!!!";
            case "studied":
                return "выучено";
            default:
                return "-";
        }
    }

    @GetMapping("/context/set/{setId}/studying")
    public List<Context> findForStudying(@PathVariable("setId") Long setId) {
        List<Context> contextList = serviceContext.findByParams(false, Collections.singletonList(setId), false);
        final List<Context> contextListNew = new ArrayList<>();
        contextList.forEach(context -> {
            if (!Arrays.asList("repeated", "studied").contains(getContextStatus(context).state)) {
                if ("repeat".equals(getContextStatus(context).state)) {
                    contextListNew.add(0, context);
                } else {
                    contextListNew.add(contextListNew.size(), context);
                }
            }
        });

        return contextListNew.subList(0, Math.min(5, contextListNew.size()));
    }

    @GetMapping("/context/set/{setId}")
    public List<Context> findBySets(@PathVariable("setId") Long setId) {
        return serviceContext.findByParams(false, Collections.singletonList(setId), false);
    }

    @GetMapping("/context/table")
    public ContextTable findContextTable(
            @RequestParam(name = "isUnionAll", required = false) boolean isUnionAll,
            @RequestParam(name = "ids[]", required = false) List<Long> ids,
            @RequestParam(name = "draw") Integer draw,
            @RequestParam(name = "start") Integer start,
            @RequestParam(name = "length") Integer length,
            @RequestParam Map<String, String> params
    ) {
        if (ids != null && ids.size() > 0) {
            List<Context> contextList = serviceContext.findByParams(isUnionAll, ids, true);
            int countRecord = contextList.size();
            ContextTable contextTable = new ContextTable();
            contextTable.setDraw(draw);
            contextTable.setRecordsFiltered(countRecord);
            contextTable.setRecordsTotal(countRecord);
            contextTable.setData(new ArrayList<>());

            contextList.forEach(context -> {
                UUID uuid = UUID.randomUUID();
                ContextTableData contextTableData = new ContextTableData();
                contextTableData.setRowId(String.valueOf(context.getId()));
//                contextTableData.setWord(context.getLexeme().getValue());
//                contextTableData.setTypeOf(context.getLexeme().getType().getName());
//                contextTableData.setDef(context.getDef());
                contextTableData.setStatus(getStatus(context));
                StringBuilder examples = new StringBuilder();
                List<Example> exampleList = null;// context.getExamples();
                int index = Math.min(exampleList.size(), 3);
                exampleList = exampleList.subList(0, index);
                exampleList.forEach(example -> {
                    examples.append("<li>").append(example.getText()).append("</li>");
                });
                examples.append("</ul>");
                contextTableData.setExamples(examples.toString());
                contextTableData.setCheckbox("<input type=\"checkbox\">");
                contextTable.getData().add(contextTableData);
            });
            int size = contextTable.getData().size();
            if (size > 0 && start < countRecord) {
                int startI = start;
                int endI = Math.min(start + length, countRecord);
                contextTable.setData(contextTable.getData().subList(startI, endI));
            }

            return contextTable;
        }
        return new ContextTable();
    }

    //------------------------
    @GetMapping("/context")
    public List<Context> findAllByIds(@RequestParam(name = "ids[]") List<Long> ids) {
        return serviceContext.findAllByListId(ids);
    }


    //-----------------------------------------------------------------
    @PostMapping("/context/{contextId}/set/{setId}")
    public void attachToSet(@PathVariable("contextId") long contextId, @PathVariable("setId") long setId) {
        serviceContext.attachToSet(contextId, setId);
    }

    @DeleteMapping("/context/{contextId}/set/{setId}")
    public void detachFromSet(@PathVariable("contextId") long contextId, @PathVariable("setId") long setId) {
        serviceContext.detachFromSet(contextId, setId);
    }


}
