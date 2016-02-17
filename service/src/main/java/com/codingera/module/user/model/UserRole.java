package com.codingera.module.user.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.codingera.module.base.model.IdEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "ce_user_role")
public class UserRole extends IdEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6529807424722399560L;

	public static enum Role {
		ROLE_ADMIN, ROLE_USER, ROLE_GUEST, 
		ROLE_UNITY, ROLE_MOBILE
	}

	private User user;

	private Role role;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonIgnore
	public User getUser() {
		return user;
	}

	@Enumerated(EnumType.STRING)
	@Column(name = "role", length = 20)
	public Role getRole() {
		return role;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void setRole(Role role) {
		this.role = role;
	}

}
