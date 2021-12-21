package jentus.dictionary.service;

import jentus.dictionary.model.Context;
import jentus.dictionary.model.Example;
import jentus.dictionary.model.dto.ContextDto;
import jentus.dictionary.model.dto.ExampleDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ContextToContextDtoConverterImpl implements ContextToContextDtoConverter {

    private final ContextStatusService contextStatusService;

    @Override
    public ContextDto convert(Context context) {
        ContextDto contextDto = new ContextDto();
        contextDto.setId(context.getId());
        contextDto.setTranslate(context.getTranslate());
        contextDto.setDefinition(context.getDefinition());
        List<ExampleDto> exampleDtoList = new ArrayList<>();
        List<Example> exampleList = context.getExamples();
        exampleList = exampleList != null ? exampleList : new ArrayList<>();
        exampleList.forEach(example -> {
            ExampleDto exampleDto = new ExampleDto();
            exampleDto.setId(example.getId());
            exampleDto.setText(example.getText());
            exampleDtoList.add(exampleDto);
        });
        contextDto.setExampleList(exampleDtoList);
        contextDto.setStatus(contextStatusService.getContextStatusDtoByContext(context));

        return contextDto;
    }
}
