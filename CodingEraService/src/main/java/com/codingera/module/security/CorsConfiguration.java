package com.codingera.module.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * 
 * @author JasonWoo
 *
 *         Global CORS configuration
 * 
 *         As of version 4.2, Spring MVC supports CORS out of the box. Using
 *         controller method CORS configuration with @CrossOrigin annotations in
 *         your Spring Boot application does not require any specific
 *         configuration.
 */
@Configuration
@EnableWebMvc
public class CorsConfiguration extends WebMvcConfigurerAdapter {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry
		.addMapping("/api/**")
		.allowedOrigins("*")
		.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
		.allowedHeaders("Authorization", "Origin", "Accept", "X-Requested-With", "Content-Type", "Access-Control-Request-Method", "Access-Control-Request-Headers")
		.exposedHeaders("Authorization", "Accept")
		.allowCredentials(true).maxAge(3600);
	}


}