package com.codingera.module.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.codingera.module.user.model.UserRole;

public interface UserRoleRepository extends PagingAndSortingRepository<UserRole, Long>, JpaSpecificationExecutor<UserRole> {

	List<UserRole> findByUserId(Long userId);
}
