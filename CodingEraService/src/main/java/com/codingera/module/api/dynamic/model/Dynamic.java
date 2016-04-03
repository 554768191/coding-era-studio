package com.codingera.module.api.dynamic.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.codingera.module.api.comment.model.Comment;
import com.codingera.module.api.tag.model.Tag;
import com.codingera.module.base.model.IdEntity;
import com.codingera.module.user.model.User;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "ce_dynamic")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Dynamic extends IdEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2167007833436749963L;

	public enum Status {
		PUBLISHED, // 已发布
		DELETED// 删除

	}


	private String content;

	private Status status;





	@Lob
	@Basic(fetch = FetchType.LAZY)
	@Column(name = "CONTENT")
	public String getContent() {
		return content;
	}



	public void setContent(String content) {
		this.content = content;
	}

	

	@Enumerated(EnumType.STRING)
	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}


	





	

	

}
