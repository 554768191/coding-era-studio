package com.codingera;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication // same as @Configuration @EnableAutoConfiguration @ComponentScan
public class CodingeraBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodingeraBootApplication.class, args);
	}
	
}
