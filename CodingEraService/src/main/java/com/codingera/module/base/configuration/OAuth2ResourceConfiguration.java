package com.codingera.module.base.configuration;
///*
// * Copyright 2012-2015 the original author or authors.
// *
// * Licensed under the Apache License, Version 2.0 (the "License");
// * you may not use this file except in compliance with the License.
// * You may obtain a copy of the License at
// *
// *      http://www.apache.org/licenses/LICENSE-2.0
// *
// * Unless required by applicable law or agreed to in writing, software
// * distributed under the License is distributed on an "AS IS" BASIS,
// * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// * See the License for the specific language governing permissions and
// * limitations under the License.
// */
//
//package com.codingera.module.oauth2;
//
//import javax.sql.DataSource;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.autoconfigure.security.SecurityProperties;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.annotation.Order;
//import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
//import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
//import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
//import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;
//
//@Configuration
//@EnableResourceServer
////@EnableWebSecurity
////@EnableGlobalMethodSecurity(prePostEnabled = true)
//@Order(8) 
//public class OAuth2ResourceConfiguration extends ResourceServerConfigurerAdapter {
//
//	@Autowired
//	private DataSource dataSource;
//	
//	@Override
//	public void configure(HttpSecurity http) throws Exception {
//		
////		http.antMatcher("/**").authorizeRequests()
////		.antMatchers("/api/**").hasRole("USER")
//		http
//		.formLogin().loginPage("/login").permitAll()
//		.and()
//			.requestMatchers().antMatchers("/login", "/oauth/authorize", "/oauth/confirm_access")
//		.and()
//			.authorizeRequests().anyRequest().authenticated()
//		.and().csrf().disable();
//	}
//
//	@Override
//	public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
//		JdbcTokenStore tokenStore = new JdbcTokenStore(dataSource);
//		resources.resourceId("api-resource").tokenStore(tokenStore);
//	}
//
//	
//}