package jentus.dictionary.component;

import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import jentus.dictionary.forms.NewCardForm;
import org.springframework.stereotype.Component;

@Component
public class NewCardLayout extends VerticalLayout {
    public NewCardLayout() {
        NewCardForm newCardForm=new NewCardForm();
        add(newCardForm);
        newCardForm.setWidthFull();
        //newCardForm.getStyle().set("background","red");
        newCardForm.setWidth("50%");
        setWidthFull();
        setAlignItems(FlexComponent.Alignment.CENTER);
        //layout.getStyle().set("background","blue");
    }
}
