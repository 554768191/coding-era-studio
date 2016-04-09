package com.codingera.module.base.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.access.expression.method.MethodSecurityExpressionHandler;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.GlobalMethodSecurityConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.provider.expression.OAuth2MethodSecurityExpressionHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.codingera.module.base.handler.CustomAuthenticationEntryPoint;
import com.codingera.module.base.handler.CustomLogoutSuccessHandler;

@Configuration
@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true)
@Order(-10)
// @Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
class ApplicationSecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private CustomLogoutSuccessHandler customLogoutSuccessHandler;
	@Autowired
	private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

	@Override
	public void init(WebSecurity web) throws Exception {
		super.init(web);
		web.ignoring().antMatchers("/temp/**", "/api/open/**", "/h2-console/**");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.formLogin()
			.loginPage("/login")
			.permitAll()
		.and()
			.logout().logoutRequestMatcher(new AntPathRequestMatcher("/oauth/logout"))
			.logoutSuccessHandler(customLogoutSuccessHandler).permitAll()
		.and()
			.requestMatchers()
			.antMatchers("/aa", "/login", "/oauth/logout", "/oauth/authorize", "/oauth/confirm_access")
		.and()
			.authorizeRequests().anyRequest().authenticated();
	}

	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		// What？！在这里配置用户信息无效。
		// auth.inMemoryAuthentication()
		// .withUser("admin").password("admin").roles("ADMIN", "USER")
		// .and().withUser("user").password("user").roles("USER");

		auth.parentAuthenticationManager(authenticationManager);
	}

//	@Override
//	public void configure(WebSecurity web) throws Exception {
//		web.ignoring().antMatchers("/temp/**", "/api/open/**", "/h2-console/**");
//	}
	
}