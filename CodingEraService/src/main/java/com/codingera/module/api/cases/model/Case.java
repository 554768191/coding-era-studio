package com.codingera.module.api.cases.model;

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
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.codingera.module.api.comment.model.Comment;
import com.codingera.module.api.tag.model.Tag;
import com.codingera.module.base.model.IdEntity;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

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

	private String title;

	private String content;

	private String bannerUrl;


	private Status status;

	private List<Tag> tags = new ArrayList<Tag>();

	private List<Comment> comments;

	@Column(name = "TITLE", length = 50)
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	@Lob
	@Basic(fetch = FetchType.LAZY)
	@Column(name = "CONTENT")
	public String getContent() {
		return content;
	}

	@Column(length = 200)
	public String getBannerUrl() {
		return bannerUrl;
	}

	public void setBannerUrl(String bannerUrl) {
		this.bannerUrl = bannerUrl;
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

	@ManyToMany(cascade = { CascadeType.ALL })
	@JoinTable(name = "ce_case_tag", 
		joinColumns = { @JoinColumn(name = "case_id", referencedColumnName = "id") }, 
		inverseJoinColumns = { @JoinColumn(name = "tag_id", referencedColumnName = "id") })
	public List<Tag> getTags() {
		return tags;
	}

	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}

	@OneToMany(mappedBy = "ceCase", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	public List<Comment> getComments() {
		return comments;
	}
	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

}
