package com.codingera.module.user.controll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.codingera.module.base.controll.ActionResult;
import com.codingera.module.user.model.User;
import com.codingera.module.user.service.UserService;

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
	public ActionResult getUser(@RequestBody User user) {
		user = userService.create(user);
		return new ActionResult(ActionResult.RESULT_SUCCESS, user);
	}
	
	/**
	 * 修改信息
	 * 
	 * @return
	 */
	@RequestMapping(value = "/account", method = RequestMethod.POST)
	public ActionResult updateUser(@RequestBody User user) {
		user = userService.create(user);
		return new ActionResult(ActionResult.RESULT_SUCCESS, user);
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

}
