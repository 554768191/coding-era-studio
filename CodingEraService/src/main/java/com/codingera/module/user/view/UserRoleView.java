package com.codingera.module.user.view;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.codingera.module.user.model.User;
import com.codingera.module.user.model.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown=true)
public class UserRoleView implements Serializable {

	private static final long serialVersionUID = -192550188817193798L;

	private List<UserRole> userRoles = new ArrayList<UserRole>();
	private User user;
	private Long userId;

	public List<UserRole> getUserRoles() {
		return userRoles;
	}

	public void setUserRoles(List<UserRole> userRoles) {
		this.userRoles = userRoles;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
	

}
