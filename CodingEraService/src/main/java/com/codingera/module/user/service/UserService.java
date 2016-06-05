package com.codingera.module.user.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.codingera.module.user.criteria.UserQueryCriteria;
import com.codingera.module.user.model.RolePermission;
import com.codingera.module.user.model.User;
import com.codingera.module.user.model.UserResetPasswordToken;
import com.codingera.module.user.model.UserRole;
import com.codingera.module.user.view.UserRoleView;

public interface UserService extends UserDetailsService {

	public User create(User user);

	public User getUserByUserName(String name);

	public User getById(Long id);

	public void delById(Long id);

	public Page<User> findUsersByCriteria(Pageable pr, UserQueryCriteria criteria);

	public User updateUser(User user);

	public User saveUserResetPasswordToken(UserResetPasswordToken token);

	public UserResetPasswordToken getUserResetPasswordToken(String token);

	public User resetPassword(UserResetPasswordToken resetToken);
	
	/**
	 * 
	 * 查找用户权限
	 * 后期再考虑使用缓存
	 * 
	 * @param user
	 * @param resource
	 * @param permission
	 * @return
	 */
	public List<RolePermission> findUserPermissions(User user, String resource, String permission);
	
	public List<RolePermission> findUserPermissions(User user);
	public List<RolePermission> findUserPermissions(User user, String resource);

	/**
	 * 校验用户名是否存在
	 * 
	 * @param userName
	 * @return
	 */
	public boolean isExistUserName(String userName);

	/**
	 * 保存用户所属角色
	 * 
	 * @param userRoleView
	 * @return
	 */
	public List<UserRole> saveUserRoles(UserRoleView userRoleView);
	public List<UserRole> findUserRoles(Long userId);
	

}
