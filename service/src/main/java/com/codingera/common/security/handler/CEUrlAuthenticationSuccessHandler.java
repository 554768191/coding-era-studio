package com.codingera.common.security.handler;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;

public class CEUrlAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

@Autowired SessionRegistry sessionRegistry;
	
	
	@Autowired RememberMeServices rememberMeServices;
	
	@Autowired TokenBasedRememberMeServices tokenBasedRememberMeServices;
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request,
			HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {
		super.onAuthenticationSuccess(request, response, authentication);
		//User user=(User) authentication.getPrincipal();
		//sessionRegistry.registerNewSession(GaykesVariable.USER_ONLINE_SESSION_PREFIX+user.getId(), user);
	}

	
}
