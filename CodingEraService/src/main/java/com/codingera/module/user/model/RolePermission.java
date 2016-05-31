package com.codingera.module.user.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.codingera.module.base.model.NewIdEntity;

@Entity
@Table(name = "ce_role_permission")
public class RolePermission extends NewIdEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6529807424722399560L;


	@Column(name = "role", length = 20)
	private String role;
	
	/**
	 * 资源
	 * 可以理解为前端各个目录的唯一ID，或者是后端的各个模块，如user、article
	 */
	@Column(name = "resource", length = 20)
	private String resource;
	
	/**
	 * 权限
	 * 多个权限逗号分隔，如 read,write
	 */
	@Column(name = "permission", length = 100)
	private String permission;

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getPermission() {
		return permission;
	}

	public void setPermission(String permission) {
		this.permission = permission;
	}

	public String getResource() {
		return resource;
	}

	public void setResource(String resource) {
		this.resource = resource;
	}
	

}
