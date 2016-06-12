/*******************************************************************************
 * Copyright (c) 2005, 2014 springside.github.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 *******************************************************************************/
package com.codingera.module.base.model;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.Transient;
import javax.persistence.Version;

import org.apache.commons.beanutils.PropertyUtils;
import org.springframework.beans.BeanUtils;

import com.codingera.module.base.common.util.CeSecurityUtil;
import com.codingera.module.user.model.User;
import com.codingera.module.user.model.UserProfileTag;
import com.codingera.module.user.model.UserRole;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

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

	/**
	 * 
	 */
	private static final long serialVersionUID = -643367577473642251L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Long id;

	private Date createdTime;

	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY, cascade = { CascadeType.DETACH, CascadeType.REFRESH })
	@JoinColumn(name = "created_user_id", updatable = false)
	private User createdUser;

	@Version
	private long version;
	
	@Transient
	@JsonProperty("createdUser")
	private User createdBy;
	
	//为了json嵌套循环使用的
	public User getCreatedBy() {
		if( this.createdUser != null){
			this.createdBy = new User();
			try {
				PropertyUtils.copyProperties(createdBy, this.createdUser);
				
				List<UserRole> roles = new ArrayList<UserRole>();
				List<UserProfileTag> userProfileTags = new ArrayList<UserProfileTag>();
				this.createdBy.setRoles(roles);
				this.createdBy.setUserProfileTags(userProfileTags);
			} catch (Exception e) {
				//忽略异常
			}
		}
		
		return createdBy;
	}
	
	

	public void setCreatedBy(User createdBy) {
		this.createdBy = createdBy;
	}



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getCreatedTime() {
		return createdTime;
	}

	public void setCreatedTime(Date createdTime) {
		this.createdTime = createdTime;
	}

	public User getCreatedUser() {
		return createdUser;
	}

	public void setCreatedUser(User createdUser) {
		this.createdUser = createdUser;
	}

	public long getVersion() {
		return version;
	}

	public void setVersion(long version) {
		this.version = version;
	}
	
	
	

	@PrePersist
	public void prePersist() {
		if (this.getCreatedTime() == null) {
			this.setCreatedTime(new Date());
		}
		if (this.getCreatedUser() == null) {
			User user = CeSecurityUtil.getCurrentUser();
			if (user != null) {
				this.setCreatedUser(user);
			} else {
				// 应该模拟一个admin用户,等佶闪清明回来再决定
				// this.setCreatedUserCode(null);
			}
		}

	}

}
