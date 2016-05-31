package com.codingera.module.user.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.codingera.module.base.model.IdEntity;

/**
 * 
 * 用户信息
 * 
 * @author JasonWoo
 *
 */
@Entity
@Table(name = "ce_user_profile")
public class UserProfile extends IdEntity {

	private static final long serialVersionUID = -192550188817193798L;

	@OneToOne
	@JoinColumn(name="USER_ID")
	private User user;
	
	@Column(name = "INTRODUCTION")
	private String introduction;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getIntroduction() {
		return introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}
	
	//标签
	
	//组织
	
	
}
