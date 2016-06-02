package com.codingera.module.user.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.codingera.module.user.criteria.RoleQueryCriteria;
import com.codingera.module.user.model.Role;
import com.codingera.module.user.model.RolePermission;
import com.codingera.module.user.repository.RolePermissionRepository;
import com.codingera.module.user.repository.RoleRepository;
import com.codingera.module.user.service.RoleService;

@Service("RoleService")
public class RoleServiceImpl implements RoleService {

	@Autowired
	RoleRepository roleRepository;
	@Autowired
	RolePermissionRepository rolePermissionRepository;
	
	
	@Override
	public Role getById(String id) {
		return roleRepository.findOne(id);
	}
	@Override
	public void delById(String id) {
		roleRepository.delete(id);
		
	}
	@Override
	public Page<Role> findRolesByCriteria(Pageable pg, RoleQueryCriteria criteria) {
		return roleRepository.findByCriteria(pg, criteria);
	}
	@Override
	public Role save(Role role) {
		return roleRepository.save(role);
	}
	
	@Override
	public List<RolePermission> findRolePermissions(String role) {
		return rolePermissionRepository.findByRole(role);
	}

	@Override
	public List<RolePermission> findRolePermissions(String role, String resource) {
		return rolePermissionRepository.findByRoleAndResource(role, resource);
	}
	
	@Override
	public List<Role> findRoles() {
		return (List<Role>) roleRepository.findAll();
	}


}
