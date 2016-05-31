package com.codingera.module.api.cases.model;

import java.util.ArrayList;
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
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.codingera.module.api.comment.model.Comment;
import com.codingera.module.api.tag.model.Tag;
import com.codingera.module.base.model.IdEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "ce_case")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Case extends IdEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2167007833436749963L;

	public enum Status {
		PUBLISHED, // 已发布
		SKETCH, // 草稿
		DELETED// 删除

	}
	@Column(name = "TITLE", length = 50)
	private String title;
	
	//摘要
	@Column(length = 200)
	private String summary;

	@Lob
	@Basic(fetch = FetchType.LAZY)
	@Column(name = "CONTENT")
	private String content;

	@Column(length = 200)
	private String bannerUrl;

	@Enumerated(EnumType.STRING)
	private Status status;

	
	@ManyToMany(cascade = { CascadeType.ALL })
	@JoinTable(name = "ce_case_tag", 
		joinColumns = { @JoinColumn(name = "case_id", referencedColumnName = "id") }, 
		inverseJoinColumns = { @JoinColumn(name = "tag_id", referencedColumnName = "id") })
	private List<Tag> tags = new ArrayList<Tag>();

	
	@OneToMany(mappedBy = "ceCase", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Comment> comments;

	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	
	public String getContent() {
		return content;
	}

	
	public String getBannerUrl() {
		return bannerUrl;
	}

	public void setBannerUrl(String bannerUrl) {
		this.bannerUrl = bannerUrl;
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
	
	
	
	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	
	public List<Tag> getTags() {
		return tags;
	}

	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}

	
	public List<Comment> getComments() {
		return comments;
	}
	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}
	
	

}
