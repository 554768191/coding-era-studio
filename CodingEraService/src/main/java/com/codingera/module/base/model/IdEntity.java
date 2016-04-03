/*******************************************************************************
 * Copyright (c) 2005, 2014 springside.github.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 *******************************************************************************/
package com.codingera.module.base.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.persistence.Version;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.provider.OAuth2Authentication;

import com.codingera.module.commen.util.CeSecurityUtil;
import com.codingera.module.user.model.User;

/**
 * 统一定义id的entity基类.
 * 
 * 基类统一定义id的属性名称、数据类型、列名映射及生成策略.
 * Oracle需要每个Entity独立定义id的SEQUCENCE时，不继承于本类而改为实现一个Idable的接口。
 * 
 * @author calvin
 */
// JPA 基类的标识
@MappedSuperclass
public abstract class IdEntity implements Serializable {

	protected Long id;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}
	
	private Date createdTime;
	
	private User createdUser;
	
	private long version;
	
	
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "created_user_id")
	public User getCreatedUser() {
		return createdUser;
	}

	public void setCreatedUser(User createdUser) {
		this.createdUser = createdUser;
	}

	@PrePersist
	public void prePersist() {
		if(this.getCreatedTime()== null) {
			this.setCreatedTime(new Date());
		}
		if(this.getCreatedUser() == null){
			User user = CeSecurityUtil.getCurrentUser();
			if(user != null){
				this.setCreatedUser(user);
			}else{
				//应该模拟一个admin用户,等佶闪清明回来再决定
				//this.setCreatedUserCode(null);
			}
		}
		
	}
	
//	@PreUpdate
//	public void preUpdate() {
//		
//	}
	
	
	

	public Date getCreatedTime() {
		return createdTime;
	}




	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}




	@Version
	public long getVersion() {
		return version;
	}



	public void setVersion(long version) {
		this.version = version;
	}



	public void setId(Long id) {
		this.id = id;
	}
}
