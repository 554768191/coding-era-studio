package com.codingera.module.commen.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;

import com.codingera.module.user.model.User;

public class CeSecurityUtil {

	/**
	 * 获取当前登录用户
	 * @return
	 */
	public static User getCurrentUser () {
		User current;
		final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		final Object principal = authentication.getPrincipal();
		if (authentication instanceof OAuth2Authentication && (principal instanceof String || principal instanceof org.springframework.security.core.userdetails.User)) {
			current = loadOauthUserJsonDto((OAuth2Authentication) authentication);
		} else {
			final User userDetails = (User) principal;
			current = userDetails;
		}
		return current;
	}
	
	public static User loadOauthUserJsonDto(OAuth2Authentication oAuth2Authentication) {
		User userJsonDto = new User();
		userJsonDto.setUsername(oAuth2Authentication.getName());

		return userJsonDto;
	}
}
