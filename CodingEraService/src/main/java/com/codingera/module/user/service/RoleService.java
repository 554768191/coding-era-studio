package com.codingera.module.user.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.user.criteria.RoleQueryCriteria;
import com.codingera.module.user.model.Role;
import com.codingera.module.user.model.RolePermission;

public interface RoleService{

	public Role save(Role role);

	public Role getById(String id);

	public void delById(String id);

	public List<Role> findRoles();
	
	public Page<Role> findRolesByCriteria(Pageable pg, RoleQueryCriteria criteria);

	public List<RolePermission> findRolePermissions(String role);
	
	public List<RolePermission> findRolePermissions(String role, String resource);

	

}
