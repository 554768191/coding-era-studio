package com.codingera.module.user.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.codingera.module.base.model.NewIdEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "ce_user_profile_tag")
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserProfileTag extends NewIdEntity {


	private static final long serialVersionUID = 8547163154648068420L;
	
	
	// 名字
	@Column(name = "NAME", length = 50, unique=true, nullable=false)
	private String name;
	

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}


	
	
}
