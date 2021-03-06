package com.codingera.module.api.tag.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.codingera.module.api.cases.model.Case;
import com.codingera.module.base.model.IdEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "ce_tag")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Tag extends IdEntity {

	private static final long serialVersionUID = 2167007833436749963L;

	public Tag() {
		super();
	}

	public Tag(String name) {
		super();
		this.name = name;
	}

	// 名字
	@Column(name = "NAME", length = 50, unique=true, nullable=false)
	private String name;
	// 类别
	@Column(name = "CATEGORY", length = 10)
	private String category;
	// 热门
	@Column(name = "HOT")
	private Integer hot;

	@ManyToMany(mappedBy = "tags", fetch = FetchType.LAZY)
	private List<Case> cases;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getHot() {
		return hot;
	}

	public void setHot(Integer hot) {
		this.hot = hot;
	}

	public List<Case> getCases() {
		return cases;
	}

	public void setCases(List<Case> cases) {
		this.cases = cases;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

}
