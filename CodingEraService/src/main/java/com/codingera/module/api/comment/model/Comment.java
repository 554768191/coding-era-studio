package com.codingera.module.api.comment.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Formula;

import com.codingera.module.api.cases.model.Case;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

/**
 * 
 * 评论
 * 
 * @author JasonWoo
 *
 */

@Entity
@Table(name = "ce_comment")
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@commentid")
// @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Comment extends BaseComment {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3246120447625111803L;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "refrence_id")
	@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@tagid")
	// @JsonIgnore
	private Case ceCase;

	/**
	 * 是否有叶子节点
	 */
	@Formula(value = "(select count(*) from ce_comment c where c.parent_id = id)")
//	@Transient
	private Integer hasChildren;

	public Case getCeCase() {
		return ceCase;
	}

	public void setCeCase(Case ceCase) {
		this.ceCase = ceCase;
	}

	public Integer getHasChildren() {
		return hasChildren;
	}

	public void setHasChildren(Integer hasChildren) {
		this.hasChildren = hasChildren;
	}

}
