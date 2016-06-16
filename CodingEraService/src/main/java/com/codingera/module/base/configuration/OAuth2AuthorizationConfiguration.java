package com.codingera.module.base.configuration;

import java.net.URI;
import java.security.KeyPair;

import javax.sql.DataSource;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerEndpointsConfiguration;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
import org.springframework.security.oauth2.provider.token.store.KeyStoreKeyFactory;

import com.codingera.module.base.handler.CustomAuthenticationEntryPoint;
import com.codingera.module.user.service.UserService;

/**
 * 
 * @author Jason
 *
 */
@Configuration
//@EnableAuthorizationServer
//@EnableResourceServer
@Import({AuthorizationServerEndpointsConfiguration.class, OAuth2CustomAuthConfiguration.class, OAuth2CustomResourceConfiguration.class})
class OAuth2AuthorizationConfiguration extends AuthorizationServerConfigurerAdapter {

	@Autowired
	private DataSource dataSource;
	@Autowired
	private UserService userService;

	@Autowired
	AuthenticationManagerBuilder authenticationManagerBuilder;

	 @Autowired
	 private AuthenticationManager authenticationManager;

	@Autowired
	private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

	static String key(final String resource) throws Exception {
		URI uri = SecurityConfig.class.getClassLoader().getResource(resource).toURI();
		return IOUtils.toString(uri);
	}
	
	@Bean
	public JwtAccessTokenConverter jwtAccessTokenConverter() throws Exception {
		JwtAccessTokenConverter jwt = new JwtAccessTokenConverter();
		jwt.setSigningKey(key("rsa_private_key.pem"));
		jwt.setVerifierKey(key("rsa_public_key.pem"));
		jwt.afterPropertiesSet();
		return jwt;
		
		//另一种配置方法
//		JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
//		KeyPair keyPair = new KeyStoreKeyFactory(new ClassPathResource("codingera.jwt"), "password".toCharArray())
//				.getKeyPair("codingera");
//		converter.setKeyPair(keyPair);
//		return converter;
		
		//不使用自定义的秘钥也可以
//		return new JwtAccessTokenConverter();
	}
	
//	/**
//	 * 经测试,加上这个配置后，数据库里的token被删掉后token还是有效的
//	 * @param resource
//	 * @return
//	 * @throws Exception
//	 */
//	@Bean
//	public JwtTokenStore jwtTokenStore() throws Exception {
//		JwtAccessTokenConverter enhancer = new JwtAccessTokenConverter();
//		enhancer.setVerifierKey(key("rsa_private_key.pem"));
//		enhancer.afterPropertiesSet();
//		return new JwtTokenStore(enhancer);
//	}

	@Override
	public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {

		// 1.保险写法
		// @see https://github.com/spring-projects/spring-boot/issues/1801
//		AuthenticationManager auth = new AuthenticationManager() {
//			@Override
//			public Authentication authenticate(Authentication authentication) throws AuthenticationException {
//				return authenticationManagerBuilder.getOrBuild().authenticate(authentication);
//			}
//		};
//		endpoints.authenticationManager(auth).tokenStore(tokenStore);

		// 2.这种用法虽然简便，但是目前出现多次创建authenticationManager的情况，如果不控制好共享问题可能报错
		endpoints.authenticationManager(authenticationManager).userDetailsService(userService);
		
		// 将token信息存放数据库
		JdbcTokenStore tokenStore = new JdbcTokenStore(dataSource);
		endpoints.tokenStore(tokenStore);
//		endpoints.tokenStore(jwtTokenStore());
		
		// token改用jwt，目前比较流行，而且这种token可以直接解析到用户信息等
		endpoints.accessTokenConverter(jwtAccessTokenConverter());
	}

	@Override
	public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
		// 1.直接在内存配置资源信息
		// clients.inMemory().withClient(applicationName + "-client")
		// .authorizedGrantTypes("password", "authorization_code",
		// "refresh_token")
		// .authorities("ROLE_USER").scopes("write").resourceIds(applicationName)
		// .secret("123456");

		// 2.从数据库读取资源信息
		clients.jdbc(dataSource);
	}

	@Override
	public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
		super.configure(security);
		
		security.tokenKeyAccess("permitAll()").checkTokenAccess("isAuthenticated()");
		
		//security.allowFormAuthenticationForClients();
		// security.authenticationEntryPoint(customAuthenticationEntryPoint);
	}
	

}