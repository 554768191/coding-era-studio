package com.codingera.module.oauth2.controll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.codingera.module.oauth2.model.Credentials;
import com.codingera.module.user.model.User;
import com.codingera.module.user.service.UserService;

/**
 * @see <a
 *      href="http://projects.spring.io/spring-security-oauth/docs/oauth2.html">Spring
 *      Security OAuth</a> and navigate to "Customizing the UI"
 */
@RestController
public class AuthorizationController {

	@Autowired
	private UserService userService;

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String showLoginForm(final Credentials credentials) {
		return "login";
	}

	/**
	 * 获取当前登录用户信息
	 * 
	 * @return
	 */
	@RequestMapping("/api/me")
	public User userInfo() {
		return userService.loadCurrentUser();
	}

}
