package com.codingera.module.oauth2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;

/**
 * 1.get token
 * curl -X POST -vu mobile-client:123456 http://localhost:8080/oauth/token -d "password=admin&username=user&grant_type=password&scope=write&client_secret=123456&client_id=mobile-client" 
 * or
 * curl -X post -u mobile-client:123456 http://localhost:8080/oauth/token\?client_id\=mobile-client\&client_secret\=123456\&grant_type\=password\&scope\=write\&username\=user\&password\=admin
 * 
 * 2.refresh token
 * curl -X post -u mobile-client:123456 http://localhost:8080/oauth/token\?client_id\=mobile-client\&client_secret\=mobile\&grant_type\=refresh_token\&refresh_token\=a01ea2e2-4af6-4235-9075-c44770ec7bec
 * 
 * 3.request resource
 * curl -X get  http://localhost:8080/api/demo\?access_token\=1389178a-db21-43b7-8621-1ef846cb94bb
 * 
 * @author Jason
 *
 */
@Configuration
@EnableResourceServer
@EnableAuthorizationServer
class OAuth2Configuration extends AuthorizationServerConfigurerAdapter {

	String applicationName = "mobile";

	// This is required for password grants, which we specify below as one of the
	// {@literal authorizedGrantTypes()}.
	@Autowired
	AuthenticationManagerBuilder authenticationManager;

	@Override
	public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
		// Workaround for
		// https://github.com/spring-projects/spring-boot/issues/1801
		endpoints.authenticationManager(new AuthenticationManager() {
			@Override
			public Authentication authenticate(Authentication authentication) throws AuthenticationException {
				return authenticationManager.getOrBuild().authenticate(authentication);
			}
		});
	}

	@Override
	public void configure(ClientDetailsServiceConfigurer clients) throws Exception {

		clients.inMemory().withClient(applicationName + "-client")
				.authorizedGrantTypes("password", "authorization_code", "refresh_token")
				.authorities("ROLE_USER").scopes("write").resourceIds(applicationName)
				.secret("123456");
	}
}