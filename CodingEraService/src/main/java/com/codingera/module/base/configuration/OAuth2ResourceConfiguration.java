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

import javax.servlet.http.HttpServletRequest;
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
import org.springframework.security.web.util.matcher.RequestMatcher;

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
			//只处理带上token的请求，启用后要与WebSecurityConfiguration配合好
//			.requestMatcher(new OAuthRequestedMatcher())
			.authorizeRequests()
			// ******************************************************************************************************************
			// Some browsers like Chrome like to send OPTIONS request to
			// look for CORS before making AJAX call. Therefore, it is
			// better to always allow OPTIONS requests.
			// ******************************************************************************************************************
			.antMatchers(HttpMethod.OPTIONS).permitAll()
			.antMatchers(HttpMethod.POST, "/api/article/*").access("hasPermission('article','write')")
			.antMatchers(HttpMethod.DELETE, "/api/article/*").access("hasPermission('article','write')")
			.antMatchers(HttpMethod.GET, "/api/article/**").access("hasPermission('article','read')")
			.antMatchers(HttpMethod.POST, "/api/demo/*").access("hasPermission('demo','write')")
			.antMatchers(HttpMethod.GET, "/api/demo/**").access("hasPermission('demo','read')")
//			.antMatchers("/api/user/list").access("hasRole('ADMIN')")
			.anyRequest().authenticated();
	}

	@Override
	public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
		JdbcTokenStore tokenStore = new JdbcTokenStore(dataSource);
//		resources.resourceId("api-resource").tokenStore(tokenStore);
		resources.resourceId(null).tokenStore(tokenStore);//支持多个resourceId
		
		OAuth2WebSecurityExpressionHandler expressionHandler = new OAuth2WebSecurityExpressionHandler();
		expressionHandler.setPermissionEvaluator(customPermissionEvaluator);
		resources.expressionHandler(expressionHandler);
		
		resources.authenticationEntryPoint(customAuthenticationEntryPoint);
	}
	
	/**
	 * 
	 * 在上面HttpSecurity启用这个方法后
	 * Oauth2Security只处理带上token的请求，其他的请求由WebSecurity转到登录页面
	 * 启用后要将WebSecurityConfiguration下面这段代码注释掉，否则WebSecurity将会只处理下面配置的请求，剩下的请求将处于无认证状态
	 * .antMatchers("/", "/user", "/browser/**", "/login", "/oauth/logout", "/oauth/authorize", "/oauth/confirm_access")
	 * 
	 * 默认禁用
	 * 只有"/", "/user", "/browser/**", "/login", "/oauth/logout", "/oauth/authorize", "/oauth/confirm_access"
	 * 才会转到登录页面
	 * 其他请求如果没有token会转到401页面
	 * 
	 * The OAuthRequestedMatcher is added in so that the Oauth filter will only
	 * process Oauth2 requests. We added this in so that an unauthorized request
	 * will be denied at the Basic Authentication layer instead of Oauth 2
	 * layer. This may not make any difference in term of functionality but we
	 * added it in for usability. For the client, they will received 401 HTTP
	 * 
	 * Status with this new header versus the old header: 
	 * WWW-Authenticate:Basic realm=”Realm” 
	 * WWW-Authenticate:Bearer realm=”spring-boot-application”, error=”unauthorized”, error_description=”Full authentication is required
	 * to access this resource”
	 * 
	 */
	private static class OAuthRequestedMatcher implements RequestMatcher {
		public boolean matches(HttpServletRequest request) {
			String auth = request.getHeader("Authorization");
			// Determine if the client request contained an OAuth Authorization
			boolean haveOauth2Token = (auth != null) && auth.startsWith("Bearer");
			boolean haveAccessToken = request.getParameter("access_token") != null;
			return haveOauth2Token || haveAccessToken;
		}
	}
	
}