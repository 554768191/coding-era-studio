package com.codingera.module.base.common.util;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.util.Assert;

import com.codingera.module.user.model.User;
import com.codingera.module.user.model.UserRole;

public class CeSecurityUtil {

	/**
	 * 系统默认角色，新角色可直接在数据库插入
	 */
	public static final String ROLE_ADMIN = "ROLE_ADMIN";//管理员
	public static final String ROLE_USER = "ROLE_USER";//普通用户
	public static final String ROLE_GUEST = "ROLE_GUEST";//访客
	public static final String ROLE_UNITY = "ROLE_UNITY";//测试
	public static final String ROLE_MOBILE = "ROLE_MOBILE";//移动端用户
	public static final String ROLE_JASON = "ROLE_JASON";//He is the KING!

	public static final String PERMISSION_READ = "read";//读的权限
	public static final String PERMISSION_WRITE = "write";//写的权限
	
	/**
	 * 获取当前登录用户
	 * @return
	 */
	public static User getCurrentUser() {
		final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		User current = castAuthenticationToUser(authentication);
		return current;
	}
	
	public static User castAuthenticationToUser(Authentication authentication) {
		User current;
		final Object principal = authentication.getPrincipal();
		if (authentication instanceof OAuth2Authentication && (principal instanceof String || principal instanceof org.springframework.security.core.userdetails.User)) {
			current = loadAuthUserJsonDto(authentication);
			return current;
		}
		if(principal instanceof String){
			current = loadAuthUserJsonDto(authentication);
			return current;
		}
		final User userDetails = (User) principal;
		current = userDetails;
		return current;
	}
	
	private static User loadAuthUserJsonDto(Authentication Authentication) {
		User userJsonDto = new User();
		userJsonDto.setUsername(Authentication.getName());
		return userJsonDto;
	}
	
	/**
	 * TODO Jason 用户角色判断写法没有优化
	 * 
	 * @param role
	 * @return
	 */
	public static boolean hasRole(User currentUser, String role) {
		Assert.notNull(currentUser, "user is null");
		List<UserRole> hasRoles = currentUser.getRoles();
		for (UserRole userRole : hasRoles) {
			if (role.equals(userRole.getRole())) {
				return true;
			}
		}
		return false;
	}
}
