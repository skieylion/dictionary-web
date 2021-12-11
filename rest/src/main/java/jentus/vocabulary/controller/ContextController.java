package jentus.vocabulary.controller;

import jentus.vocabulary.exception.ContextNotFoundException;
import jentus.vocabulary.model.*;
import jentus.vocabulary.service.ServiceContext;
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

    private ContextStatus getContextStatus(Context context) {
        ContextStatus eventState = new ContextStatus();
        List<ContextEvent> contextEventList = context.getContextEvent();
        if (contextEventList == null) contextEventList = new ArrayList<>();
        int size = contextEventList.size();

        List<Date> dateList = new ArrayList<>();

        for (ContextEvent contextEvent : contextEventList) {
            if (contextEvent.getContextStatus().getId() == 1) {
                dateList.add(contextEvent.getTs());
            } else if (contextEvent.getContextStatus().getId() == 2) {
                eventState.state = "studied";
                return eventState;
            }
        }
        dateList.sort(Date::compareTo);
        int sizeDateList = dateList.size();

        Date last = sizeDateList > 0 ? dateList.get(dateList.size() - 1) : null;
        size = last != null ? size : 0;
        Date current = new Date();
        double offset = size > 0 ? (double) (current.getTime() - last.getTime()) / 1000 / 60 : 0;
        eventState.state = "repeat";
        eventState.count = size;

        switch (size) {
            case 0:
                eventState.state = "new";
                break;
            case 1:
                if (offset < 30) {
                    eventState.state = "repeated";
                    eventState.offset = Math.ceil(30 - offset);
                    eventState.unit = "мин.";
                }
                break;
            case 2:
                offset = offset / 60;
                if (offset < 24) {
                    eventState.state = "repeated";
                    eventState.offset = Math.ceil(24 - offset);
                    eventState.unit = "ч.";
                }
                break;
            case 3:
                offset = offset / 60;
                var week3 = 24 * 7 * 3;
                if (offset < week3) {
                    eventState.state = "repeated";
                    eventState.offset = Math.ceil((week3 - offset) / 24);
                    eventState.unit = "дн.";
                }
                break;
            case 4:
                offset = offset / 60;
                var month3 = 24 * 7 * 4 * 3;
                if (offset < month3) {
                    eventState.state = "repeated";
                    eventState.offset = Math.ceil((month3 - offset) / 24);
                    eventState.unit = "дн.";
                }
                break;
            default:
                eventState.state = "studied";
        }
        return eventState;
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
                contextTableData.setWord(context.getForm().getValue());
                contextTableData.setTypeOf(context.getForm().getType().getName());
                contextTableData.setDef(context.getDef());
                contextTableData.setStatus(getStatus(context));
                StringBuilder examples = new StringBuilder();
                List<Example> exampleList = context.getExamples();
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

    @GetMapping("/context")
    public List<Context> findAllByIds(@RequestParam(name = "ids[]") List<Long> ids) {
        return serviceContext.findAllByListId(ids);
    }

    @GetMapping("/context/{id}")
    public Context findById(@PathVariable("id") long id) throws ContextNotFoundException {
        return serviceContext.findById(id);
    }

    @DeleteMapping("/context/{id}")
    public void delete(@PathVariable("id") long id) {

        serviceContext.delete(id);
    }

    @PostMapping("/context/{id}/event")
    public void know(@PathVariable("id") long id) {
        serviceContext.know(id);
    }

    @DeleteMapping("/context/{id}/event")
    public void notKnow(@PathVariable("id") long id) {
        serviceContext.notKnow(id);
    }

    @PostMapping("/context/{contextId}/repetition")
    public void repeat(@PathVariable("contextId") long contextId) {
        serviceContext.repeat(contextId);
    }

    @PostMapping("/context/{contextId}/set/{setId}")
    public void attachToSet(@PathVariable("contextId") long contextId, @PathVariable("setId") long setId) {
        serviceContext.attachToSet(contextId, setId);
    }

    @DeleteMapping("/context/{contextId}/set/{setId}")
    public void detachFromSet(@PathVariable("contextId") long contextId, @PathVariable("setId") long setId) {
        serviceContext.detachFromSet(contextId, setId);
    }


}
