package com.codingera.module.user.view;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.codingera.module.user.model.UserRole;

public class UserView implements Serializable {

	private static final long serialVersionUID = -192550188817193798L;

	private String username;

	private String avatar;

	private Integer sex;

	private String intro;

	private List<UserRole> roles = new ArrayList<UserRole>();

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public Integer getSex() {
		return sex;
	}

	public void setSex(Integer sex) {
		this.sex = sex;
	}

	public String getIntro() {
		return intro;
	}

	public void setIntro(String intro) {
		this.intro = intro;
	}

	public List<UserRole> getRoles() {
		return roles;
	}

	public void setRoles(List<UserRole> roles) {
		this.roles = roles;
	}

}
