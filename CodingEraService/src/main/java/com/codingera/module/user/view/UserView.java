package com.codingera.module.user.view;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;

import com.codingera.module.user.model.RolePermission;
import com.codingera.module.user.model.User;
import com.codingera.module.user.model.UserProfileTag;
import com.codingera.module.user.model.UserRole;

public class UserView implements Serializable {

	private static final long serialVersionUID = -192550188817193798L;

	private String username;
	private String displayName;
	private String email;
	private String phone;
	private String avatar;
	private Integer sex;
	private String intro;
	private String status;
	private String summary;
	private List<UserProfileTag> userProfileTags = new ArrayList<UserProfileTag>();

	private List<UserRole> roles = new ArrayList<UserRole>();
	private Collection<? extends GrantedAuthority> authorities;
	List<RolePermission> permissions;

	public UserView() {
		super();
	}

	public UserView(User user) {
		super();
		this.displayName = user.getDisplayName();
		this.username = user.getUsername();
		this.email = user.getEmail();
		this.phone = user.getPhone();
		this.sex = user.getSex();
		this.avatar = user.getAvatar();
		this.roles = user.getRoles();
		this.authorities = user.getAuthorities();
		this.status = user.getStatus();
		this.intro = user.getIntro();
		this.summary = user.getSummary();
		this.userProfileTags = user.getUserProfileTags();
	}

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

	public String getDisplayName() {
		return displayName;
	}

	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public List<UserProfileTag> getUserProfileTags() {
		return userProfileTags;
	}

	public void setUserProfileTags(List<UserProfileTag> userProfileTags) {
		this.userProfileTags = userProfileTags;
	}

	public List<RolePermission> getPermissions() {
		return permissions;
	}

	public void setPermissions(List<RolePermission> permissions) {
		this.permissions = permissions;
	}


}
