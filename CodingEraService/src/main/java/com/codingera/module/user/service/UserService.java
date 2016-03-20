package com.codingera.module.user.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;

import com.codingera.module.user.criteria.UserQueryCriteria;
import com.codingera.module.user.model.User;

public interface UserService extends UserDetailsService {

	public User create(User user);

	public User getUserByUserName(String name);

	public User getById(Long id);

	public void delById(Long id);

	public Page<User> findUserByCriteria(Pageable pr, UserQueryCriteria criteria);

	public User loadCurrentUser();

	public User updateUser(User user);
}
