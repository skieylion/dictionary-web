package jentus.vocabulary;

import jentus.vocabulary.service.Runner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
@EnableAutoConfiguration
public class VocabularyApplication {

	public static void main(String[] args) {
		ApplicationContext context=SpringApplication.run(VocabularyApplication.class, args);
		context.getBean(Runner.class).run();
	}

}
