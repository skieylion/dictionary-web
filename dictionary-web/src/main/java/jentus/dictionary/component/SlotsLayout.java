package jentus.dictionary.component;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import org.springframework.stereotype.Component;

@Component
public class SlotsLayout extends VerticalLayout {
    public SlotsLayout() {
        add(new Button("Button 3"));
    }
}
