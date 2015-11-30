package com.codingera.module.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.codingera.module.user.model.User;

public class CESecurityUserService implements UserDetailsService {


	@Autowired UserService userService;
	
	@Override
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		User user=userService.getUserByUserName(username);
		return user;
	}

	
	
	

}
