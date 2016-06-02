package com.codingera.module.user.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.codingera.module.user.model.Role;
import com.codingera.module.user.repository.custom.RoleRepositoryCustom;

public interface RoleRepository extends PagingAndSortingRepository<Role, String>, JpaSpecificationExecutor<Role>, RoleRepositoryCustom {

	Role getByRole(String role);
	
}
