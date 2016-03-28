package com.codingera.module.base.controll;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.codingera.module.base.model.Credentials;
import com.codingera.module.user.model.User;
import com.codingera.module.user.service.UserService;
import com.codingera.module.user.view.UserView;
import com.google.common.base.Optional;

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
	public ModelAndView showLoginForm(final Credentials credentials) {
		Map<String, Object> model = new HashMap<String, Object>();
		if (credentials.getError() != null) {
			model.put("error", "Invalid username and password!");
		}
		if (credentials.getLogout() != null) {
			model.put("logout", "You've been logged out successfully.");
		}
		return new ModelAndView("login", model);
	}

//	@RequestMapping(value = "/login", method = RequestMethod.GET)
//	public ModelAndView getLoginPage(@RequestParam Optional<String> error) {
//		return new ModelAndView("login", "error", error);
//	}

	/**
	 * 获取当前登录用户信息
	 * 
	 * @return
	 */
	@RequestMapping("/api/me")
	public UserView userInfo() {
		User current = userService.loadCurrentUser();
		UserView view = new UserView(current);
		return view;
	}

}
