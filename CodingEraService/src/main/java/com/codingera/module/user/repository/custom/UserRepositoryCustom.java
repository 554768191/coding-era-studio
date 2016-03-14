package com.codingera.module.user.repository.custom;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.user.criteria.UserQueryCriteria;
import com.codingera.module.user.model.User;

public interface UserRepositoryCustom {

	public Page<User> findUserByCriteria(Pageable pg,UserQueryCriteria criteria);
}
