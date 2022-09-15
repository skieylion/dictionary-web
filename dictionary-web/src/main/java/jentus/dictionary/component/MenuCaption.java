package jentus.dictionary.component;

import com.vaadin.flow.component.html.H1;
import org.springframework.stereotype.Component;

@Component
public class MenuCaption extends H1 {
    public MenuCaption() {
        H1 title = new H1("MyApp");
        title.getStyle()
                .set("font-size", "var(--lumo-font-size-l)")
                .set("margin", "0");
    }
}
