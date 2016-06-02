package com.codingera.module.user.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * 
 * 角色表
 * 是用户表的子集
 * 
 * @author JasonWoo
 *
 */
@Entity
@Table(name = "ce_role")
public class Role  implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6529807424722399560L;

	@Id
	@Column(name = "role", length = 20, nullable=false)
	private String role;
	
	@Column(name = "description", length = 100)
	private String description;
	
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	

}
