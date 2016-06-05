package com.codingera.module.user.view;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.codingera.module.user.model.RolePermission;

public class RoleView implements Serializable {

	private static final long serialVersionUID = -192550188817193798L;

	private List<RolePermission> rolePermissions = new ArrayList<RolePermission>();

	public List<RolePermission> getRolePermissions() {
		return rolePermissions;
	}

	public void setRolePermissions(List<RolePermission> rolePermissions) {
		this.rolePermissions = rolePermissions;
	}
	

}
