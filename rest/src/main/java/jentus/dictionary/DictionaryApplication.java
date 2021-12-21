package jentus.dictionary;

import jentus.dictionary.service.RunnerImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

//https://github.com/skieylion/2021-02-otus-spring-ubahhukob/tree/main/project
//https://github.com/skieylion/dictionary

@SpringBootApplication
public class DictionaryApplication {

    public static void main(String[] args) {
        ApplicationContext context=SpringApplication.run(DictionaryApplication.class, args);
        //context.getBean(RunnerImpl.class).run();
    }

}
