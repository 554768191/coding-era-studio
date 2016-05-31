package com.codingera.module.api.dynamic.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Lob;
import javax.persistence.Table;

import com.codingera.module.base.model.IdEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

	@Lob
	@Basic(fetch = FetchType.LAZY)
	@Column(name = "CONTENT")
	private String content;

	@Enumerated(EnumType.STRING)
	private Status status;

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

}
