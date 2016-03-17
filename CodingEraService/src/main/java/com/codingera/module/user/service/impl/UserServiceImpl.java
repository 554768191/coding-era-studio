package com.codingera.module.user.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.validation.ValidationException;

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

import com.codingera.module.user.criteria.UserQueryCriteria;
import com.codingera.module.user.model.User;
import com.codingera.module.user.model.UserRole;
import com.codingera.module.user.repository.UserRepository;
import com.codingera.module.user.service.UserService;

@Service("UserService")
public class UserServiceImpl implements UserService {

	@Autowired UserRepository userRepository;
	
	@Override
	public User create(User user) {
		
//		User existUserName = this.getUserByUserName(user.getUsername());
//		if(existUserName != null){
//			throw new ValidationException("user name already exist :" + user.getUsername());
//		}
//		
		//生成密码
		//以前使用的是md5，Md5PasswordEncoder 和 ShaPasswordEncoder，现在推荐用bcrpt。
		//bcrypt算法与md5/sha算法有一个很大的区别，Bcrpt中的salt可以是随机的。每次生成的hash值都是不同的，这样暴力猜解起来或许要更困难一些。
		//Md5PasswordEncoder md5=new Md5PasswordEncoder();
		//user.setPassword(md5.encodePassword(user.getPassword(), null));
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    	String password = user.getPassword();
    	String hashedPassword = passwordEncoder.encode(password);
    	user.setPassword(hashedPassword);
    	
//    	//默认角色
//		List<UserRole> userRoles=new ArrayList<UserRole>();
//		UserRole userRole=new UserRole();
//		userRole.setUser(user);
//		userRole.setRole(UserRole.Role.ROLE_USER);
//		userRoles.add(userRole);
//		user.setRoles(userRoles);
		
		user.setAccountNonLocked(true);//锁住用户
		user.setAccountNonExpired(true);//过期
		user.setEnabled(true);//可用
		user.setCredentialsNonExpired(true);//凭证过期
		
		return userRepository.save(user);
	}

	@Override
	public User getUserByUserName(String name) {
		return userRepository.findUserByUsername(name);
	}

	@Override
	public Page<User> findUserByCriteria(Pageable pr,UserQueryCriteria criteria) {
		return userRepository.findUserByCriteria(pr,criteria);
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
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        final Object principal = authentication.getPrincipal();
        if (authentication instanceof OAuth2Authentication &&
                (principal instanceof String || principal instanceof org.springframework.security.core.userdetails.User)) {
            return loadOauthUserJsonDto((OAuth2Authentication) authentication);
        } else {
            final User userDetails = (User) principal;
        	return userDetails;
        }
	}
	
	private User loadOauthUserJsonDto(OAuth2Authentication oAuth2Authentication) {
		User userJsonDto = new User();
		userJsonDto.setUsername(oAuth2Authentication.getName());

        //final Collection<GrantedAuthority> authorities = oAuth2Authentication.getAuthorities();
        //for (GrantedAuthority authority : authorities) {
            //userJsonDto.getRoles().add(authority.getAuthority());
        //}
        return userJsonDto;
    }

}
