package com.codingera.module.user.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.validation.ValidationException;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;

import com.codingera.module.base.common.util.CeSecurityUtil;
import com.codingera.module.user.criteria.UserQueryCriteria;
import com.codingera.module.user.model.RolePermission;
import com.codingera.module.user.model.User;
import com.codingera.module.user.model.UserResetPasswordToken;
import com.codingera.module.user.model.UserRole;
import com.codingera.module.user.repository.RolePermissionRepository;
import com.codingera.module.user.repository.UserRepository;
import com.codingera.module.user.repository.UserResetPasswordTokenRepository;
import com.codingera.module.user.repository.UserRoleRepository;
import com.codingera.module.user.service.UserService;
import com.codingera.module.user.view.UserRoleView;
import com.google.common.base.Function;
import com.google.common.collect.Lists;

@Service("UserService")
public class UserServiceImpl implements UserService {

	@Autowired
	UserRoleRepository userRoleRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	RolePermissionRepository rolePermissionRepository;
	@Autowired
	UserResetPasswordTokenRepository userResetPasswordTokenRepository;

	@Override
	public User create(User user) {
		Assert.notNull(user.getUsername(), "用户名不能为空");
		Boolean isExistUserName = this.isExistUserName(user.getUsername());
		Assert.state(isExistUserName == false, "user name already exist :" + user.getUsername());

		// ******************************************************************************************************************
		// 生成密码
		// 以前使用的是md5，Md5PasswordEncoder 和 ShaPasswordEncoder，现在推荐用bcrpt。
		// bcrypt算法与md5/sha算法有一个很大的区别，Bcrpt中的salt可以是随机的。每次生成的hash值都是不同的，这样暴力猜解起来或许要更困难一些。
		// Md5PasswordEncoder md5=new Md5PasswordEncoder();
		// user.setPassword(md5.encodePassword(user.getPassword(), null));
		// ******************************************************************************************************************
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String password = StringUtils.isEmpty(user.getPassword()) ? "123456" : user.getPassword();
		String hashedPassword = passwordEncoder.encode(password);
		user.setPassword(hashedPassword);

		// 默认角色(默认无任何权限)
		List<UserRole> userRoles = new ArrayList<UserRole>();
//		UserRole userRole = new UserRole();
//		userRole.setUser(user);
//		userRole.setRole(CeSecurityUtil.ROLE_USER);
//		userRoles.add(userRole);
		user.setRoles(userRoles);

		user.setAccountNonLocked(true);// 锁住用户
		user.setAccountNonExpired(true);// 过期
		user.setEnabled(true);// 可用
		user.setCredentialsNonExpired(true);// 凭证过期
		
		if(StringUtils.isEmpty(user.getDisplayName())){
			user.setDisplayName(user.getUsername());
		}
		return userRepository.save(user);
	}

	@Override
	public User getUserByUserName(String name) {
		return userRepository.findUserByUsername(name);
	}

	@Override
	public Page<User> findUsersByCriteria(Pageable pr, UserQueryCriteria criteria) {
		return userRepository.findByCriteria(pr, criteria);
	}

	@Override
	public User getById(Long id) {
		return userRepository.findOne(id);
	}

	@Override
	public void delById(Long id) {
		userRepository.delete(id);
	}

	@Override
	public User loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findUserByUsername(username);
		return user;
	}

	@Override
	public User updateUser(User user) {
		User account = this.getUserByUserName(user.getUsername());
		Assert.notNull(account, "user info is null :" + user.getUsername());
		
		//判断是否ADMIN角色，现在可以统一使用权限表达式配置
//		User currentUser = CeSecurityUtil.getCurrentUser();
//		if (!account.getId().equals(currentUser.getId())) {
//			boolean isAdmin = CeSecurityUtil.hasRole(currentUser, CeSecurityUtil.ROLE_ADMIN);
//			Assert.isTrue(isAdmin, "you have no right to update user info !");
//		}
		
		//这样是为了防止直接保存user导致一些敏感字段被无意修改了
		boolean isDirty = false;
		if (user.getEmail() != null) {
			account.setEmail(user.getEmail());
			isDirty = true;
		}
		if (user.getPhone() != null) {
			account.setPhone(user.getPhone());
			isDirty = true;
		}
		if (user.getDisplayName() != null) {
			account.setDisplayName(user.getDisplayName());
			isDirty = true;
		}
		if (user.getSex() != null) {
			account.setSex(user.getSex());
			isDirty = true;
		}
		if (user.getAvatar() != null) {
			account.setAvatar(user.getAvatar());
			isDirty = true;
		}
//		性签名
		if(user.getIntro() != null){
			account.setIntro(user.getIntro());
			isDirty = true;
		}
//		简介
		if(user.getSummary() != null){
			account.setSummary(user.getSummary());
			isDirty = true;
		}
		if(user.getUserProfileTags() !=null && !user.getUserProfileTags().isEmpty()){
			account.setUserProfileTags(user.getUserProfileTags());
			isDirty = true;
		}
		
		Assert.isTrue(isDirty, "没有任何修改无需保存");
		
		return userRepository.save(account);
	}

	@Override
	public User saveUserResetPasswordToken(UserResetPasswordToken token) {
		User account = this.getUserByUserName(token.getUsername());
		
		Assert.notNull(account, "用户名不存在 :" + token.getUsername());
		
		UserResetPasswordToken storeToken = this.userResetPasswordTokenRepository.getUserResetPasswordTokenByUsername(token.getUsername());
		BeanUtils.copyProperties(token, storeToken, "id");
		
		userResetPasswordTokenRepository.save(storeToken);
		return account;
	}

	@Override
	public UserResetPasswordToken getUserResetPasswordToken(String token) {
		UserResetPasswordToken storeToken = userResetPasswordTokenRepository.getUserResetPasswordTokenByToken(token);
		if(storeToken != null){
			// 有效期校验
			Date expiresDate =  storeToken.getExpires();
			if(expiresDate == null){
				return null;
			}
			Date now = new Date();
			long result = expiresDate.getTime() - now.getTime();
			if(result < 0){
				return null;
			}
		}
		return storeToken;
	}

	@Override
	public User resetPassword(UserResetPasswordToken resetToken) {
		if(resetToken.getNewPassword() == null || resetToken.getVerifyPassword() == null){
			throw new ValidationException("密码为空");	
		}
		if(!resetToken.getNewPassword().equals(resetToken.getVerifyPassword())){
			throw new ValidationException("密码不一致");
		}
		UserResetPasswordToken storeToken = getUserResetPasswordToken(resetToken.getToken());
		if(storeToken != null){
			return this.getUserByUserName(storeToken.getUsername());
		}
		return null;
	}

	private List<String> loadRolesFromUser(User user){
		Assert.notNull(user, "用户不能为空");
		List<UserRole> hasRoles = user.getRoles();
		List<String> roles = Lists.transform(hasRoles, new Function<UserRole, String>(){
			@Override
			public String apply(UserRole input) {
				return input.getRole();
			}
		});
		return roles;
	}
	
	@Override
	public List<RolePermission> findUserPermissions(User user) {
		List<String> roles = loadRolesFromUser(user);
		List<RolePermission> result = rolePermissionRepository.findByRoleIn(roles);
		return result;
	}
	
	@Override
	public List<RolePermission> findUserPermissions(User user, String resource, String permission) {
		Assert.doesNotContain(permission, ",", " 非法的权限类型");
		List<String> roles = loadRolesFromUser(user);
		List<RolePermission> result = rolePermissionRepository.findRolePermissions(roles, resource, permission);
		return result;
	}
	
	@Override
	public List<RolePermission> findUserPermissions(User user, String resource) {
		List<String> roles = loadRolesFromUser(user);
		List<RolePermission> result = rolePermissionRepository.findByRoleInAndResource(roles, resource);
		return result;
	}

	@Override
	public boolean isExistUserName(String userName) {
		User user = userRepository.findUserByUsername(userName);
		if(user != null){
			return true;
		}
		return false;
	}

	@Override
	public List<UserRole> saveUserRoles(UserRoleView userRoleView) {
		Assert.notNull(userRoleView.getUserId(), "缺失用户ID");
		User user = this.getById(userRoleView.getUserId());
		Assert.notNull(user, "找不到用户");
		
		List<UserRole> userRoles = userRoleView.getUserRoles();
		List<UserRole> saveList = new ArrayList<UserRole>();
		List<UserRole> deleteList = new ArrayList<UserRole>();
		for (UserRole userRole : userRoles) {
			if(userRole.getId() != null && userRole.getRole() == null){
				deleteList.add(userRole);
				continue;
			}
			userRole.setUser(user);
			saveList.add(userRole);
		}
//		todo Jason 不知为何发送的是Update语句
		userRoleRepository.delete(deleteList);
		return (List<UserRole>)userRoleRepository.save(saveList);
	}

	@Override
	public List<UserRole> findUserRoles(Long userId) {
		return userRoleRepository.findByUserId(userId);
	}
	

}
