package com.codingera.module.base.configuration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.core.annotation.Order;
import org.springframework.security.oauth2.config.annotation.configuration.ClientDetailsServiceConfiguration;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerEndpointsConfiguration;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerSecurityConfiguration;

/**
 * 
 * 自定义了AuthorizationServerSecurityConfiguration代替系统的@EnableAuthorizationServer
 * 暂时保留以备不时之需
 * 
 * @author JasonWoo
 *
 */
@Order(0)
@Configuration
@Import({ ClientDetailsServiceConfiguration.class, AuthorizationServerEndpointsConfiguration.class })
public class OAuth2CustomAuthConfiguration extends AuthorizationServerSecurityConfiguration {
	
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        
//        http
//		.authorizeRequests()
//		.anyRequest().authenticated();
//        
//        super.configure(http);
//    }
	
    
}