package com.archeo.application;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.archeo") // Scans all modules under com.archeo.*
@EnableJpaRepositories(basePackages = "com.archeo")    // Picks up all repositories
@EntityScan(basePackages = "com.archeo")               // Scans for @Entity classes
public class Application {

	public static void main(String[] args) {
		SpringApplication application = new SpringApplication(Application.class);
		application.addInitializers(new DotenvInitializer());
		application.run(args);
	}

	public static class DotenvInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
		@Override
		public void initialize(ConfigurableApplicationContext context) {
			Dotenv dotenv = Dotenv.configure()
					.directory(System.getProperty("user.dir"))
					.ignoreIfMissing()
					.load();

			dotenv.entries().forEach(entry -> {
				if (System.getProperty(entry.getKey()) == null) {
					System.setProperty(entry.getKey(), entry.getValue());
				}
			});
		}
	}
}
