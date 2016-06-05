package com.codingera.module.user.controll;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.codingera.module.base.controll.ActionResult;
import com.codingera.module.user.criteria.UserQueryCriteria;
import com.codingera.module.user.model.User;
import com.codingera.module.user.model.UserRole;
import com.codingera.module.user.service.UserService;
import com.codingera.module.user.view.UserRoleView;
import com.codingera.module.user.view.UserView;

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

	/**
	 * 
	 * 查找所有用户
	 * 
	 * @param pr
	 * @param criteria
	 * @return
	 */
	@RequestMapping(method = RequestMethod.GET)
	public ActionResult findUsers(Pageable pr, @ModelAttribute UserQueryCriteria criteria) {
		Page<User> pages = userService.findUsersByCriteria(pr, criteria);
		return new ActionResult(ActionResult.RESULT_SUCCESS, pages);
	}
	
	/**
	 * query user
	 * 
	 * @param userName
	 * @return
	 */
	@RequestMapping(value="/{userName}",method = RequestMethod.GET)
	public ActionResult getUser(@PathVariable String userName) {
		UserView view = null;
		User user = userService.getUserByUserName(userName);
		if(user != null){
			view = new UserView(user);
		}
		return new ActionResult(ActionResult.RESULT_SUCCESS, view);
	}
	
	/**
	 * 修改信息
	 * 
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST)
	public ActionResult updateUser(@RequestBody User user) {
		user = userService.updateUser (user);
		UserView view = new UserView(user);
		return new ActionResult(ActionResult.RESULT_SUCCESS, view);
	}
	
	/**
	 * 保存用户所属角色
	 * 
	 * @param userRoleView
	 * @return
	 */
	@RequestMapping(path="/roles", method = RequestMethod.POST)
	public ActionResult saveUserRoles(@RequestBody UserRoleView userRoleView) {
		List<UserRole> result = userService.saveUserRoles(userRoleView);
		return new ActionResult(ActionResult.RESULT_SUCCESS, result);
	}

	@RequestMapping(path="/roles", method = RequestMethod.GET)
	public ActionResult findUserRoles(Long userId) {
		List<UserRole> result = userService.findUserRoles(userId);
		return new ActionResult(ActionResult.RESULT_SUCCESS, result);
	}
	
}
