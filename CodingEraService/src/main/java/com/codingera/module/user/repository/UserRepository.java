package com.codingera.module.user.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.codingera.module.user.model.User;
import com.codingera.module.user.repository.custom.UserRepositoryCustom;

public interface UserRepository extends PagingAndSortingRepository<User, Long>, JpaSpecificationExecutor<User>,UserRepositoryCustom {

	User findUserByUsername(String username);
	
}
