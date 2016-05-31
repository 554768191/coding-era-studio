package com.codingera.module.base.configuration;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;

import com.codingera.module.base.common.util.CeSecurityUtil;
import com.codingera.module.user.model.RolePermission;
import com.codingera.module.user.model.User;
import com.codingera.module.user.service.UserService;

/**
 * 
 * hasPermission
 * 
 * 注意：
 * 加了@Component注解才能在别的地方@Autowired注入customPermissionEvaluator！
 * 直接new CustomPermissionEvaluator()的话UserService就是null的哦。
 * 
 * @author JasonWoo
 *
 */
@Component
public class CustomPermissionEvaluator implements PermissionEvaluator {
	
	@Autowired
	private UserService userService;
	
	// <GrantedAuthority>
	// NOTE - This is for example purposes only.
	private static final Map<String, List<String>> testPermissionMap;
	static {
		Map<String, List<String>> map = new HashMap<String, List<String>>();
		ArrayList<String> things = new ArrayList<String>();
		things.add("11111");
		things.add("22222");
		things.add("33333");
		things.add("44444");
		ArrayList<String> badThings = new ArrayList<String>();
		badThings.add("99999");
		badThings.add("XXXXX");
		map.put("jason", things);
		map.put("admin", badThings);
		testPermissionMap = Collections.unmodifiableMap(map);
	}

	public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {
		User user = CeSecurityUtil.castAuthenticationToUser(authentication);
		return authorize(user, (String) targetDomainObject, (String) permission);
	};

	public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType, Object permission) {
		User user = CeSecurityUtil.castAuthenticationToUser(authentication);
		return authorize(user, (String) targetId);
	};

	public boolean authorize(User user, String resource, String permission) {
		boolean allowed = false;
		System.out.println("Authorizing " + user.getUsername() + "...");
		if (user.getId() == null || !StringUtils.hasText(resource) || !StringUtils.hasText(permission)) {
			return allowed;
		}
		List<RolePermission> result = userService.findUserPermissions(user, resource, permission);
		if (result != null && result.size() > 0) {
			allowed = true;
		}
		return allowed;
	}
	public boolean authorize(User user, String thingId) {
		// 暂不支持这种表达式写法
		throw new RuntimeException("Id-based permission evaluation not currently supported.");
//		boolean allowed = false;
//		System.out.println("Authorizing " + user.getUsername() + "...");
//		if (testPermissionMap.get(user.getUsername()) != null && testPermissionMap.get(user.getUsername()).contains(thingId)) {
//			allowed = true;
//			System.out.println(user.getUsername() + " authorized!");
//		}
//		return allowed;
	};

}