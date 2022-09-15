package jentus.dictionary.component;

import com.vaadin.flow.component.applayout.AppLayout;
import com.vaadin.flow.component.applayout.DrawerToggle;
import com.vaadin.flow.router.PreserveOnRefresh;
import com.vaadin.flow.router.Route;
import org.springframework.stereotype.Component;

@Route("")
@PreserveOnRefresh
@Component
public class MainView extends AppLayout {

    private enum MenuItems {
        NEW, SLOTS;
    }

    public MainView(
            MenuTabs menuTabs,
            MenuCaption menuCaption,
            NewCardLayout newCardLayout,
            SlotsLayout slotsLayout
    ) {
        setContent(newCardLayout);
        menuTabs.addSelectedChangeListener(event -> {
            switch (MenuItems.valueOf(event.getSelectedTab().getLabel().toUpperCase())) {
                case NEW:
                    setContent(newCardLayout);
                    break;
                case SLOTS:
                    setContent(slotsLayout);
            }
        });
        setDrawerOpened(false);
        addToDrawer(menuTabs);
        addToNavbar(new DrawerToggle(), menuCaption);
    }

}