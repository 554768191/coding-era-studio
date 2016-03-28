package com.codingera.module.base.configuration;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationManager;
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;

import com.codingera.module.user.service.UserService;

/**
 * 
 * @author Jason
 *
 */
@Configuration
@EnableAuthorizationServer
@EnableResourceServer
class OAuth2Configuration extends AuthorizationServerConfigurerAdapter {

	String applicationName = "mobile";

	@Autowired
	private DataSource dataSource;
	@Autowired
	private UserService userService;
	
	// This is required for password grants, which we specify below as one of the
	// {@literal authorizedGrantTypes()}.
	@Autowired
	AuthenticationManagerBuilder authenticationManagerBuilder;
	
	// 配置ApplicationSecurityConfiguration后启用这个居然报错
//	@Autowired
//    private AuthenticationManager authenticationManager;
	
	@Override
	public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
		
		//将token信息存放数据库
		JdbcTokenStore tokenStore = new JdbcTokenStore(dataSource);
		
		// Workaround for
		// https://github.com/spring-projects/spring-boot/issues/1801
		endpoints.authenticationManager(new AuthenticationManager() {
			@Override
			public Authentication authenticate(Authentication authentication) throws AuthenticationException {
				return authenticationManagerBuilder.getOrBuild().authenticate(authentication);
			}
		}).tokenStore(tokenStore);
//		endpoints.userDetailsService(userService).tokenStore(tokenStore);
//		endpoints.authenticationManager(authenticationManager).tokenStore(tokenStore);
		
	}

	@Override
	public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
		//直接在内存配置资源信息
//		clients.inMemory().withClient(applicationName + "-client")
//				.authorizedGrantTypes("password", "authorization_code", "refresh_token")
//				.authorities("ROLE_USER").scopes("write").resourceIds(applicationName)
//				.secret("123456");
		
		//从数据库读取资源信息
		clients.jdbc(dataSource);
	}

//	@Override
//	public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
//		// TODO Auto-generated method stub
//		super.configure(security);
//		security.allowFormAuthenticationForClients();
//	}

	
}