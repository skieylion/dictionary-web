package jentus.dictionary.service.converter;

import jentus.dictionary.model.Context;
import jentus.dictionary.model.Example;
import jentus.dictionary.model.dto.ContextDtoReader;
import jentus.dictionary.model.dto.ExampleDtoReader;
import jentus.dictionary.model.dto.TranscriptionDto;
import jentus.dictionary.service.ContextStatusService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class ContextToContextDtoConverterImpl implements ContextToContextDtoConverter {

    private final ContextStatusService contextStatusService;
    private final PartOfSpeechToPartOfSpeechDtoConverter partOfSpeechToPartOfSpeechDtoConverter;

    @Override
    public ContextDtoReader convert(Context context) {
        ContextDtoReader contextDtoReader = new ContextDtoReader();
        contextDtoReader.setId(context.getId());
        contextDtoReader.setExpressionValue(context.getExpression().getValue());
        contextDtoReader.setTranslate(context.getTranslate());
        contextDtoReader.setDefinition(context.getDefinition());
        List<ExampleDtoReader> exampleDtoReaderList = new ArrayList<>();
        List<Example> exampleList = context.getExamples();
        exampleList = exampleList != null ? exampleList : new ArrayList<>();
        exampleList.forEach(example -> {
            ExampleDtoReader exampleDtoReader = new ExampleDtoReader();
            exampleDtoReader.setId(example.getId());
            exampleDtoReader.setText(example.getText());
            exampleDtoReaderList.add(exampleDtoReader);
        });
        contextDtoReader.setExampleList(exampleDtoReaderList);
        contextDtoReader.setStatus(contextStatusService.getContextStatusDtoByContext(context));
        context.getExpression().getTranscriptionSet().forEach(transcription -> {
            TranscriptionDto transcriptionDto=new TranscriptionDto();
            transcriptionDto.setValue(transcription.getValue());
            transcriptionDto.setVariant(transcription.getTranscriptionVariant().getName());
            contextDtoReader.getTranscription().add(transcriptionDto);
        });
        contextDtoReader.setPartOfSpeech(partOfSpeechToPartOfSpeechDtoConverter.convert(context.getPartOfSpeech()));

        return contextDtoReader;
    }
}
