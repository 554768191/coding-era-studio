package com.codingera.module.user.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.codingera.module.base.model.IdEntity;

/**
 * 
 * 权限表
 * 
 * @author JasonWoo
 *
 */
@Entity
@Table(name = "ce_permission")
public class Permission implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6529807424722399560L;

	@Id
	@Column(name = "permission", length = 20, nullable=false)
	private String permission;


	public String getPermission() {
		return permission;
	}


	public void setPermission(String permission) {
		this.permission = permission;
	}


}
