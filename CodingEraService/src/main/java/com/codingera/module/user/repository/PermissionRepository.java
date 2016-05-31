package com.codingera.module.user.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.codingera.module.user.model.Permission;

public interface PermissionRepository extends PagingAndSortingRepository<Permission, Long>, JpaSpecificationExecutor<Permission> {

	Permission getByPermission(String permission);
	
}
