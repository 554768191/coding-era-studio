package com.codingera.module.user.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.codingera.module.base.model.IdEntity;

@Entity
@Table(name = "ce_user_reset_password_token")
public class UserResetPasswordToken extends IdEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 6529807424722399560L;

	private String token;
	private Date expires;
	private String username;

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

}
