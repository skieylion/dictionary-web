package jentus.dictionary.component;

import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import org.springframework.stereotype.Component;

import java.util.function.Function;
import java.util.function.UnaryOperator;

@Component
public class MenuTabs extends Tabs {
    public MenuTabs() {
        add(new Tab("new"));
        add(new Tab("slots"));
        setOrientation(Tabs.Orientation.VERTICAL);
        setSelectedIndex(0);
    }
}
