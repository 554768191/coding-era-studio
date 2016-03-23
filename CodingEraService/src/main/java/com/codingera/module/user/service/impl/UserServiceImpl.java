package com.codingera.module.user.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.validation.ValidationException;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.codingera.module.user.criteria.UserQueryCriteria;
import com.codingera.module.user.model.User;
import com.codingera.module.user.model.UserResetPasswordToken;
import com.codingera.module.user.model.UserRole;
import com.codingera.module.user.repository.UserRepository;
import com.codingera.module.user.repository.UserResetPasswordTokenRepository;
import com.codingera.module.user.service.UserService;

@Service("UserService")
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepository userRepository;
	@Autowired
	UserResetPasswordTokenRepository userResetPasswordTokenRepository;

	@Override
	public User create(User user) {

		User existUserName = this.getUserByUserName(user.getUsername());
		
		Assert.notNull(existUserName, "user name already exist :" + user.getUsername());

		// 生成密码
		// 以前使用的是md5，Md5PasswordEncoder 和 ShaPasswordEncoder，现在推荐用bcrpt。
		// bcrypt算法与md5/sha算法有一个很大的区别，Bcrpt中的salt可以是随机的。每次生成的hash值都是不同的，这样暴力猜解起来或许要更困难一些。
		// Md5PasswordEncoder md5=new Md5PasswordEncoder();
		// user.setPassword(md5.encodePassword(user.getPassword(), null));
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String password = user.getPassword();
		String hashedPassword = passwordEncoder.encode(password);
		user.setPassword(hashedPassword);

		// 默认角色
		List<UserRole> userRoles = new ArrayList<UserRole>();
		UserRole userRole = new UserRole();
		userRole.setUser(user);
		userRole.setRole(UserRole.Role.ROLE_USER);
		userRoles.add(userRole);
		user.setRoles(userRoles);

		user.setAccountNonLocked(true);// 锁住用户
		user.setAccountNonExpired(true);// 过期
		user.setEnabled(true);// 可用
		user.setCredentialsNonExpired(true);// 凭证过期
		user.setDisplayName(user.getUsername());
		return userRepository.save(user);
	}

	@Override
	public User getUserByUserName(String name) {
		return userRepository.findUserByUsername(name);
	}

	@Override
	public Page<User> findUsersByCriteria(Pageable pr, UserQueryCriteria criteria) {
		return userRepository.findUserByCriteria(pr, criteria);
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
		return userRepository.findUserByUsername(username);
	}

	@Override
	public User loadCurrentUser() {
		User current;
		final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		final Object principal = authentication.getPrincipal();
		if (authentication instanceof OAuth2Authentication && (principal instanceof String || principal instanceof org.springframework.security.core.userdetails.User)) {
			current = loadOauthUserJsonDto((OAuth2Authentication) authentication);
		} else {
			final User userDetails = (User) principal;
			current = userDetails;
		}
		return current;
	}

	private User loadOauthUserJsonDto(OAuth2Authentication oAuth2Authentication) {
		User userJsonDto = new User();
		userJsonDto.setUsername(oAuth2Authentication.getName());

		// final Collection<GrantedAuthority> authorities =
		// oAuth2Authentication.getAuthorities();
		// for (GrantedAuthority authority : authorities) {
		// userJsonDto.getRoles().add(authority.getAuthority());
		// }
		return userJsonDto;
	}

	/**
	 * TODO Jason 用户角色判断写法没有优化
	 * 
	 * @param role
	 * @return
	 */
	private boolean hasRole(UserRole.Role role) {
		User currentUser = this.loadCurrentUser();
		List<UserRole> hasRoles = currentUser.getRoles();
		for (UserRole userRole : hasRoles) {
			if (role.equals(userRole.getRole())) {
				return true;
			}
		}
		return false;
	}

	@Override
	public User updateUser(User user) {
		User account = this.getUserByUserName(user.getUsername());
		Assert.notNull(account, "user info is null :" + user.getUsername());
		
		User currentUser = this.loadCurrentUser();
		if (!account.getId().equals(currentUser.getId())) {
			boolean isAdmin = hasRole(UserRole.Role.ROLE_ADMIN);
			Assert.isTrue(isAdmin, "you have no right to update user info !");
		}
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
		
		Assert.isTrue(isDirty, "No change to save");
		
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

}
