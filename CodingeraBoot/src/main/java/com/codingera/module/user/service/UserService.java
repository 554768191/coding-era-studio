package com.codingera.module.user.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.codingera.module.user.criteria.UserQueryCriteria;
import com.codingera.module.user.model.User;

public interface UserService extends UserDetailsService {

	
	User create(User user);
	User getUserByUserName(String name);
	User getById(Long id);
	void delById(Long id);
	Page<User> findUserByCriteria(Pageable pr,UserQueryCriteria criteria);
	User loadCurrentUser();
}
