package com.codingera.module.user.controll.open;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codingera.module.base.controll.ActionResult;
import com.codingera.module.user.criteria.UserQueryCriteria;
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
	 * 管理员列表(门户的联系人)
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public ActionResult getUserList(Pageable pr, @ModelAttribute UserQueryCriteria criteria) {
		criteria.setDisplayPortal(true);//只获取门户展示用户
		Page<User> pages = userService.findUsersByCriteria(pr, criteria);
		return new ActionResult(ActionResult.RESULT_SUCCESS, pages);
	}
	

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
	 * query user
	 * 
	 * @param userName
	 * @return
	 */
	@RequestMapping
	public ActionResult isExistUserName(@RequestParam String userName) {
		boolean result = userService.isExistUserName(userName);
		return new ActionResult(ActionResult.RESULT_SUCCESS, result);
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
	@RequestMapping(value = "/password", params="action=saveToken", method = RequestMethod.POST)
	public ActionResult saveUserResetPasswordToken(UserResetPasswordToken resetToken) {
		UserView view = null;
		User user = userService.saveUserResetPasswordToken(resetToken);
		if(user != null){
			view = new UserView(user);
		}
		return new ActionResult(ActionResult.RESULT_SUCCESS, view);
	}
	@RequestMapping(value = "/password", params="action=validateToken", method = RequestMethod.GET)
	public ActionResult getToken(@RequestParam String resetToken) {
		UserResetPasswordToken result = userService.getUserResetPasswordToken(resetToken);
		return new ActionResult(ActionResult.RESULT_SUCCESS, result);
	}
	/**
	 * 重设密码
	 * 
	 * @param resetToken
	 * @return
	 */
	@RequestMapping(value = "/password", params="action=reset", method = RequestMethod.POST)
	public ActionResult resetPassword(@RequestBody UserResetPasswordToken resetToken) {
		UserView view = null;
		User user = userService.resetPassword(resetToken);
		if(user != null){
			view = new UserView(user);
		}
		return new ActionResult(ActionResult.RESULT_SUCCESS, view);
	}

}
