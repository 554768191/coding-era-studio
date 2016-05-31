package com.codingera.module.user.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.codingera.module.base.model.IdEntity;
import com.codingera.module.base.model.NewIdEntity;

@Entity
@Table(name = "ce_user_reset_password_token")
public class UserResetPasswordToken extends NewIdEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6529807424722399560L;

	private String token;
	private Date expires;
	private String username;

	@Transient
	private String newPassword;
	@Transient
	private String verifyPassword;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Date getExpires() {
		return expires;
	}

	public void setExpires(Date expires) {
		this.expires = expires;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getVerifyPassword() {
		return verifyPassword;
	}

	public void setVerifyPassword(String verifyPassword) {
		this.verifyPassword = verifyPassword;
	}

}
