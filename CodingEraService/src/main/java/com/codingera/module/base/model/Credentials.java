package com.codingera.module.base.model;

import org.apache.el.stream.Optional;
import org.hibernate.validator.constraints.NotEmpty;

public class Credentials {
	
	private String userName;
	private String password;
	private String error;
	private String logout;
	
	public Credentials() {
		super();
	}

	@NotEmpty
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	@NotEmpty
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getLogout() {
		return logout;
	}

	public void setLogout(String logout) {
		this.logout = logout;
	}

	
}
