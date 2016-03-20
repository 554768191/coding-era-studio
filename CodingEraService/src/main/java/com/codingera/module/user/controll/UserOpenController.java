package com.codingera.module.user.controll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codingera.module.base.controll.ActionResult;
import com.codingera.module.user.model.User;
import com.codingera.module.user.model.UserResetPasswordToken;
import com.codingera.module.user.service.UserService;
import com.codingera.module.user.view.UserView;

/**
 * 公开API
 * 
 * @author Jason
 *
 */
@RestController
@RequestMapping("/api/open/user")
public class UserOpenController {

	@Autowired
	UserService userService;

	/**
	 * 注册用户
	 * 
	 * @return
	 */
	@RequestMapping(value = "/signup", method = RequestMethod.POST)
	public ActionResult getUser(User user) {
		user = userService.create(user);
		return new ActionResult(ActionResult.RESULT_SUCCESS, user);
	}
	
	/**
	 * query user
	 * 
	 * @param userName
	 * @return
	 */
	@RequestMapping
	public ActionResult getUser(@RequestParam String userName) {
		UserView view = null;
		User user = userService.getUserByUserName(userName);
		if(user != null){
			view = new UserView(user);
		}
		return new ActionResult(ActionResult.RESULT_SUCCESS, view);
	}
	
	/**
	 * 忘记密码
	 * 
	 * @return
	 */
	@RequestMapping(value = "/password", params="action=sendEmail", method = RequestMethod.POST)
	public ActionResult sendPassword(@RequestBody User user) {
		user = userService.create(user);
		return new ActionResult(ActionResult.RESULT_SUCCESS, user);
	}
	@RequestMapping(value = "/password", params="action=reset", method = RequestMethod.POST)
	public ActionResult resetPassword(@RequestBody User user) {
		user = userService.create(user);
		return new ActionResult(ActionResult.RESULT_SUCCESS, user);
	}
	@RequestMapping(value = "/password", params="action=saveToken", method = RequestMethod.POST)
	public ActionResult saveUserResetPasswordToken(UserResetPasswordToken token) {
		User user = userService.saveUserResetPasswordToken(token);
		UserView view = new UserView(user);
		return new ActionResult(ActionResult.RESULT_SUCCESS, view);
	}
	@RequestMapping(value = "/password", params="action=getToken", method = RequestMethod.GET)
	public ActionResult getToken(String token) {
		UserResetPasswordToken result = userService.getUserResetPasswordToken(token);
		return new ActionResult(ActionResult.RESULT_SUCCESS, result);
	}


}
