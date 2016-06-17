//package com.codingera.module.base.configuration;
//
//import java.util.List;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.sql.DataSource;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfiguration;
//import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurer;
//import org.springframework.security.oauth2.provider.expression.OAuth2WebSecurityExpressionHandler;
//import org.springframework.security.web.util.matcher.RequestMatcher;
//
//import com.codingera.module.base.handler.CustomAuthenticationEntryPoint;
//import com.codingera.module.user.service.UserService;
//
///**
// * 
// * 自定义了ResourceServerConfiguration代替系统的@EnableResourceServer
// * 这样就可以支持多个resourceId
// * 
// * @author JasonWoo
// *
// */
//@Configuration
//public class OAuth2CustomResourceConfiguration extends ResourceServerConfiguration {
//
//	@Autowired
//	private DataSource dataSource;
//	@Autowired
//	private UserService userService;
//	@Autowired
//	private CustomPermissionEvaluator customPermissionEvaluator;
//	@Autowired
//	private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
//
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//
//		// hasPermission enable
//		OAuth2WebSecurityExpressionHandler expressionHandler = new OAuth2WebSecurityExpressionHandler();
//		expressionHandler.setPermissionEvaluator(customPermissionEvaluator);
//
//		http
//		.exceptionHandling().authenticationEntryPoint(customAuthenticationEntryPoint)
//		.and()
//			.requestMatcher(new OAuthRequestedMatcher())
//			.authorizeRequests()
//			// ******************************************************************************************************************
//			// Some browsers like Chrome like to send OPTIONS request to
//			// look for CORS before making AJAX call. Therefore, it is
//			// better to always allow OPTIONS requests.
//			// ******************************************************************************************************************
//			.antMatchers(HttpMethod.OPTIONS).permitAll()
//			.antMatchers(HttpMethod.POST, "/api/article/**").access("hasPermission('article','write')")
//			.antMatchers(HttpMethod.DELETE, "/api/article/**").access("hasPermission('article','write')")
////				.antMatchers(HttpMethod.GET, "/api/article/**").access("hasPermission('article','read')")
//			.antMatchers(HttpMethod.GET, "/api/article/**").hasAnyRole("ADMIN")
//			.antMatchers(HttpMethod.POST, "/api/demo/**").access("hasPermission('demo','write')")
//			.antMatchers(HttpMethod.GET, "/api/demo/**").access("hasPermission('demo','read')")
//			.anyRequest()
//			.authenticated()
//			.expressionHandler(expressionHandler);
//
//		super.configure(http);
//	}
//
//	/**
//	 * The OAuthRequestedMatcher is added in so that the Oauth filter will only
//	 * process Oauth2 requests. We added this in so that an unauthorized request
//	 * will be denied at the Basic Authentication layer instead of Oauth 2
//	 * layer. This may not make any difference in term of functionality but we
//	 * added it in for usability. For the client, they will received 401 HTTP
//	 * 
//	 * Status with this new header versus the old header: 
//	 * WWW-Authenticate:Basic realm=”Realm” 
//	 * WWW-Authenticate:Bearer realm=”spring-boot-application”, error=”unauthorized”, error_description=”Full authentication is required
//	 * to access this resource”
//	 * 
//	 */
//	private static class OAuthRequestedMatcher implements RequestMatcher {
//		public boolean matches(HttpServletRequest request) {
//			String auth = request.getHeader("Authorization");
//			// Determine if the client request contained an OAuth Authorization
//			boolean haveOauth2Token = (auth != null) && auth.startsWith("Bearer");
//			boolean haveAccessToken = request.getParameter("access_token") != null;
//			return haveOauth2Token || haveAccessToken;
//		}
//	}
//
//	
//
//
//}