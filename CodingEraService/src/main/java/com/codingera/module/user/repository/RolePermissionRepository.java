package com.codingera.module.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.codingera.module.user.model.RolePermission;

public interface RolePermissionRepository extends PagingAndSortingRepository<RolePermission, Long>, JpaSpecificationExecutor<RolePermission> {

	List<RolePermission> findByRole(String role);
	List<RolePermission> findByRoleIn(List<String> roles);
	List<RolePermission> findByRoleAndResource(String role, String resource);
	List<RolePermission> findByRoleInAndResource(List<String> roles, String resource);
	
	@Query("SELECT a FROM RolePermission a WHERE a.role IN ?1 and a.resource = ?2  and CONCAT(',', a.permission, ',') LIKE CONCAT('%,', ?3, ',%') ") 
	List<RolePermission> findRolePermissions(List<String> roles, String resource, String permission);
}
