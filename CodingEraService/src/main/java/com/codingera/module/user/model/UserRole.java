package com.codingera.module.user.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.codingera.module.base.model.IdEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "ce_user_role")
@JsonIgnoreProperties(ignoreUnknown=true)
public class UserRole extends IdEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6529807424722399560L;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonIgnore
	private User user;

	@Column(name = "role", length = 20)
	private String role;

	public User getUser() {
		return user;
	}

	public String getRole() {
		return role;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void setRole(String role) {
		this.role = role;
	}

}
