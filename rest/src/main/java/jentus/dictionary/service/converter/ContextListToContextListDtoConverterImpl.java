package jentus.dictionary.service.converter;

import jentus.dictionary.model.ContextList;
import jentus.dictionary.model.dto.ContextListDto;
import org.springframework.stereotype.Service;

@Service
public class ContextListToContextListDtoConverterImpl implements ContextListToContextListDtoConverter {

    @Override
    public ContextListDto convert(ContextList contextList) {
        ContextListDto contextListDto=new ContextListDto();
        contextListDto.setId(contextList.getId());
        contextListDto.setName(contextList.getName());
        contextListDto.setDescription(contextList.getDescription());
        return contextListDto;
    }
}
