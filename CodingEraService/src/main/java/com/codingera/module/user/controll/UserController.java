package com.codingera.module.user.controll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.codingera.module.base.controll.ActionResult;
import com.codingera.module.user.model.User;
import com.codingera.module.user.service.UserService;

/**
 * 能力项题库管理
 * 
 * @author Jason
 *
 */
@Controller
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	UserService userService;

	@RequestMapping
	@ResponseBody
	public ActionResult getUser() {
		User user = userService.getUserByUserName("yanson");
		return new ActionResult(ActionResult.RESULT_SUCCESS, user);
	}

}