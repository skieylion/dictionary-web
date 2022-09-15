package jentus.dictionary.forms;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.icon.VaadinIcon;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import jentus.common.EntryDto;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.stream.Stream;

public class NewCardForm extends VerticalLayout {
    public NewCardForm() {
        TextField textField = new TextField();
        textField.setPlaceholder("Search");
        textField.setPrefixComponent(VaadinIcon.SEARCH.create());
        textField.setWidthFull();
        add(textField);
        EntryDto entryDto=new EntryDto();
        entryDto.setDefinition("temporary");
        entryDto.setLexemeId(1);
        entryDto.setText("adfas as dfasd");
        entryDto.setLexicalCategoryId("1");
        entryDto.setExamples(Arrays.asList("adf ","sd dsf asd","a sdfasd f"));
        Stream.of(entryDto);

        Button button=new Button("123asd");
        //button.setWidth("50%");
        button.setWidthFull();
        add(button);
        add(new Button("fgsdf"));
        setAlignItems(Alignment.CENTER);
    }
}
