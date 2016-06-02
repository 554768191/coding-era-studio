package com.codingera.module.user.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.codingera.module.user.model.Permission;
import com.codingera.module.user.repository.PermissionRepository;
import com.codingera.module.user.service.PermissionService;

@Service("PermissionService")
public class PermissionServiceImpl implements PermissionService {

	@Autowired
	PermissionRepository permissionRepository;

	@Override
	public Permission getById(String id) {
		return permissionRepository.findOne(id);
	}

	@Override
	public void delById(String id) {
		permissionRepository.delete(id);

	}

	@Override
	public Permission save(Permission permission) {
		return permissionRepository.save(permission);
	}

	@Override
	public List<Permission> findPermissions() {
		return (List<Permission>) permissionRepository.findAll();
	}

}
