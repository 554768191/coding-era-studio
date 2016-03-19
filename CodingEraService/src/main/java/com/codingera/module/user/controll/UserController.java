package com.codingera.module.user.controll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.codingera.module.base.controll.ActionResult;
import com.codingera.module.user.model.User;
import com.codingera.module.user.service.UserService;

/**
 * 
 * @author Jason
 *
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	UserService userService;

	@RequestMapping
	public ActionResult getUser() {
		User user = userService.getUserByUserName("yanson");
		return new ActionResult(ActionResult.RESULT_SUCCESS, user);
	}
	
	/**
	 * 修改信息
	 * 
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST)
	public ActionResult updateUser(User user) {
		user = userService.updateUser(user);
		return new ActionResult(ActionResult.RESULT_SUCCESS, user);
	}

}
