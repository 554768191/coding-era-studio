package com.codingera.module.user.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.codingera.module.user.model.UserResetPasswordToken;

public interface UserResetPasswordTokenRepository extends PagingAndSortingRepository<UserResetPasswordToken, Long>, JpaSpecificationExecutor<UserResetPasswordToken> {

	UserResetPasswordToken getUserResetPasswordTokenByToken(String token);

	UserResetPasswordToken getUserResetPasswordTokenByUsername(String username);
	
}
