package com.codingera.module.base.configuration;
/*
 * Copyright 2012-2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.expression.OAuth2WebSecurityExpressionHandler;
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;

import com.codingera.module.base.handler.CustomAuthenticationEntryPoint;

@Configuration
@EnableResourceServer
public class OAuth2ResourceConfiguration extends ResourceServerConfigurerAdapter {

	@Autowired
	private DataSource dataSource;
	@Autowired
	private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
	@Autowired
	private CustomPermissionEvaluator customPermissionEvaluator;
	
	@Override
	public void configure(HttpSecurity http) throws Exception {
		super.configure(http);
		http
//			.exceptionHandling()
//			.authenticationEntryPoint(customAuthenticationEntryPoint)
//			.and()
			.authorizeRequests()
			.antMatchers(HttpMethod.POST, "/api/article/*").access("hasPermission('article','write')")
			.antMatchers(HttpMethod.GET, "/api/article/**").access("hasPermission('article','read')")
			.antMatchers(HttpMethod.POST, "/api/demo/*").access("hasPermission('demo','write')")
			.antMatchers(HttpMethod.GET, "/api/demo/**").access("hasPermission('demo','read')")
//			.antMatchers("/api/user/list").access("hasRole('ADMIN')")
			.anyRequest().authenticated();
	}

	@Override
	public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
		JdbcTokenStore tokenStore = new JdbcTokenStore(dataSource);
		resources.resourceId("api-resource").tokenStore(tokenStore);
		
		OAuth2WebSecurityExpressionHandler expressionHandler = new OAuth2WebSecurityExpressionHandler();
		expressionHandler.setPermissionEvaluator(customPermissionEvaluator);
		resources.expressionHandler(expressionHandler);
		
		resources.authenticationEntryPoint(customAuthenticationEntryPoint);
//		resources.accessDeniedHandler(accessDeniedHandler)
	}
	
	
}