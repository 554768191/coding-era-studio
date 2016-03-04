package com.codingera.module.security;

import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER) 
class ApplicationSecurity extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
//		.anyRequest().permitAll()
		.anyRequest().fullyAuthenticated()
		.and().formLogin().loginPage("/login").failureUrl("/login?error").permitAll()
		.and().logout().permitAll();
	}

	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		// What？！在这里配置用户信息无效。
	}

}