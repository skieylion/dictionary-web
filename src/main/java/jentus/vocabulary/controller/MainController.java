package jentus.vocabulary.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MainController {
    @GetMapping("/index")
    public String index() {
        return "index";
    }
    @GetMapping("/app_cards.js")
    public String appCards() {
        return "app_cards.js";
    }
    @GetMapping("/app_sets.js")
    public String appSets() {
        return "app_sets.js";
    }
}
