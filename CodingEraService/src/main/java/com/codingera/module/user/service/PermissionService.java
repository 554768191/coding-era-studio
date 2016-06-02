package com.codingera.module.user.service;

import java.util.List;

import com.codingera.module.user.model.Permission;

public interface PermissionService{

	public Permission save(Permission permission);

	public Permission getById(String id);

	public void delById(String id);

	public List<Permission> findPermissions();

	

}
