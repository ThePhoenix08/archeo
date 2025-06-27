package com.archeo.server.modules.application;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@SpringBootApplication(scanBasePackages = {
		"com.archeo.server.modules.application",
		"com.archeo.server.modules.auth",
		"com.archeo.server.modules.user",
		"com.archeo.server.modules.common",
		"com.archeo.server.modules.blockchain",
		"com.archeo.server.modules.document",
		"com.archeo.server.modules.encryption",
		"com.archeo.server.modules.processing",
		"com.archeo.server.modules.template",
		"com.archeo.server.modules.verification"


})
@EnableRedisRepositories(basePackages = "com.archeo.server.modules.auth.repositories")
@EnableJpaRepositories(basePackages = "com.archeo")
@EntityScan(basePackages = "com.archeo")
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

	@Bean(name = "corsConfigurationSource")
	public CorsConfigurationSource corsConfigurationSource() {

		CorsConfiguration config = new CorsConfiguration().applyPermitDefaultValues();
		config.setAllowCredentials(true);
		config.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
		config.setAllowedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization", "X-Requested-With"));
		config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
		config.setExposedHeaders(Arrays.asList("Authorization"));

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);


		return source;
	}
}
