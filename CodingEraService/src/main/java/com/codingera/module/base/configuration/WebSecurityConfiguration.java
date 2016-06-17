package com.codingera.module.base.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.codingera.module.base.filter.CsrfHeaderFilter;
import com.codingera.module.base.handler.CustomAuthenticationEntryPoint;
import com.codingera.module.base.handler.CustomLogoutSuccessHandler;
import com.codingera.module.user.service.UserService;

@Configuration
@EnableWebSecurity
@Order(-20)
//@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
	@Autowired
	private CustomLogoutSuccessHandler customLogoutSuccessHandler;
	@Autowired
	private UserService userService;
	  
	@Override
	public void init(WebSecurity web) throws Exception {
		super.init(web);
		//这里配置的url可以直接访问，无权限控制
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
			
			//这里配置的url要登录认证,即跳转登录页面,无token认证
		.and()
			.requestMatchers()
			.antMatchers("/", "/user", "/browser/**", "/login", "/oauth/logout", "/oauth/authorize", "/oauth/confirm_access")
			.and()
			.authorizeRequests()
			// ******************************************************************************************************************
			// Some browsers like Chrome like to send OPTIONS request to
			// look for CORS before making AJAX call. Therefore, it is
			// better to always allow OPTIONS requests.
			// ******************************************************************************************************************
			.antMatchers(HttpMethod.OPTIONS).permitAll()
			.anyRequest().authenticated()
			
			//之前加了httpBasic会导致oauth2出错，现在又可以了，暂时不知原因
		.and().httpBasic()
		
			// 后台只是提供简单的API服务，没有jsp之类的，如果不是有个login页面，csrf可以禁用的
			// .and().csrf().disable();
		.and()
			.addFilterAfter(new CsrfHeaderFilter(), CsrfFilter.class)
			.csrf()
			.csrfTokenRepository(csrfTokenRepository());
//		.and()
//			.exceptionHandling().authenticationEntryPoint(customAuthenticationEntryPoint);
		
	}
	
	private CsrfTokenRepository csrfTokenRepository() {
	  HttpSessionCsrfTokenRepository repository = new HttpSessionCsrfTokenRepository();
	  repository.setHeaderName("X-XSRF-TOKEN");
	  return repository;
	}
	
	// ******************************************************************************************************************
	// 这里的authenticationManager会影响到OAuth2AuthorizationConfiguration.java的AuthenticationManager注入，可能是@Order顺序问题。
	// ******************************************************************************************************************
	// @Autowired
	// private AuthenticationManager authenticationManager;
	/**
	 * We expose the AuthenticationManager bean so that our two authentication
	 * security adapter can share a single authentication manager.
	 * 这段代码加不加似乎意义不大，求老司机带路！
	 */
	@Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

	// ******************************************************************************************************************
	// WebSecurity认证配置,当前采用的全局认证配置，这段配置暂时保留
	// ******************************************************************************************************************
//	@Override
//	public void configure(AuthenticationManagerBuilder auth) throws Exception {
//		// auth.inMemoryAuthentication()
//		// .withUser("admin").password("admin").roles("ADMIN", "USER")
//		// .and().withUser("user").password("user").roles("USER");
//
//		//auth.parentAuthenticationManager(authenticationManager);
//		
//		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//	  	auth.userDetailsService(this.userService).passwordEncoder(passwordEncoder);
//	}
	
	// ******************************************************************************************************************
	// 全局认证配置，目前放到了GlobalAuthConfiguration.java，这段配置暂时保留
	// ******************************************************************************************************************
//	@Autowired
//    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//		auth.userDetailsService(this.userService).passwordEncoder(passwordEncoder);
//    }
	
	// ******************************************************************************************************************
	// 全局方法配置，目前放到了GlobalMethodAuthConfiguration.java，这段配置暂时保留
	// ******************************************************************************************************************
//	@EnableGlobalMethodSecurity(prePostEnabled = true, jsr250Enabled = true,securedEnabled = true)
//    public static class GlobalSecurityConfiguration extends GlobalMethodSecurityConfiguration {
//        @Override
//        protected MethodSecurityExpressionHandler createExpressionHandler() {
//            return new OAuth2MethodSecurityExpressionHandler();
//        }
//    }
	
}