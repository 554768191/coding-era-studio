/*******************************************************************************
 * Copyright (c) 2005, 2014 springside.github.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 *******************************************************************************/
package com.codingera.module.base.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
	
	private String createdUserCode;
	
	private long version;
	
	
	@PrePersist
	public void prePersist() {
		if(this.getCreatedTime()== null) {
			this.setCreatedTime(new Date());
		}
		if(this.getCreatedUserCode() == null){
			User user = CeSecurityUtil.getCurrentUser();
			if(user != null){
				this.setCreatedUserCode(user.getUsername());
			}else{
				this.setCreatedUserCode("admin");
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



	public String getCreatedUserCode() {
		return createdUserCode;
	}



	public void setCreatedUserCode(String createdUserCode) {
		this.createdUserCode = createdUserCode;
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
