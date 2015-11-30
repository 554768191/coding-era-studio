package com.codingera.module.user.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.stereotype.Service;

import com.codingera.module.user.criteria.UserQueryCriteria;
import com.codingera.module.user.model.User;
import com.codingera.module.user.repository.UserRepository;
import com.codingera.module.user.service.UserService;

@Service("UserService")
public class UserServiceImpl implements UserService {

	@Autowired UserRepository userRepository;
	
	@Override
	public User create(User user) {
		
		Md5PasswordEncoder md5=new Md5PasswordEncoder();
		user.setPassword(md5.encodePassword(user.getPassword(), null));
		//List<UserRole> userRoles=new ArrayList<UserRole>();
		//UserRole userRole=new UserRole();
		//userRole.setUser(user);
		//userRole.setRole(UserRole.Role.ROLE_ADMIN);
		//userRoles.add(userRole);
		//user.setRoles(userRoles);
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


	
	

}
