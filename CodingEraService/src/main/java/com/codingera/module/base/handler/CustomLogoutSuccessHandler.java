package com.codingera.module.base.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JdbcTokenStore;
import org.springframework.security.web.authentication.AbstractAuthenticationTargetUrlRequestHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

/**
 * Spring Security logout handler
 */
@Component
public class CustomLogoutSuccessHandler 
extends AbstractAuthenticationTargetUrlRequestHandler 
implements LogoutSuccessHandler {

	private static final String BEARER_AUTHENTICATION = "bearer ";
	private static final String HEADER_AUTHORIZATION = "authorization";

	@Autowired
	private DataSource dataSource;

	@Override
	public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

		String next = (String) request.getParameter("next");
		
		String token = request.getHeader(HEADER_AUTHORIZATION);

		if (token != null && token.startsWith(BEARER_AUTHENTICATION)) {

			JdbcTokenStore tokenStore = new JdbcTokenStore(dataSource);
			
			OAuth2AccessToken oAuth2AccessToken = tokenStore.readAccessToken(token.split(" ")[1]);

			if (oAuth2AccessToken != null) {
				tokenStore.removeAccessToken(oAuth2AccessToken);
			}

		}

		response.setStatus(HttpServletResponse.SC_OK);

		response.sendRedirect((next == null || "".equals(next)) ? getDefaultTargetUrl() : next );
		
	}

}