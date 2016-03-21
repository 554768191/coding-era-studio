package com.codingera.module.api.comment.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.codingera.module.base.model.IdEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * 
 * 评论
 * 
 * @author JasonWoo
 *
 */
@Entity
@Table(name = "ce_comment_root")
public class CommentRoot extends IdEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 5950229563629387864L;

	// 根评论ID
	@OneToOne
	@JoinColumn(name = "COMMENT_ID")
	@JsonIgnore
	private Comment comment;
//	@Column(name = "COMMENT_ID", nullable = false)
//	private Long commentId;

	// 对应 主表的实体类简写名称,如Claim类,则是 com.sevendaysinn.claim.model.Claim
	@Column(name = "MODEL_NAME", length = 100, nullable = false)
	public String modelName;

	// 对应关联主表的ID
	@Column(name = "MODEL_ID", nullable = false)
	public Long modelId;

	public String getModelName() {
		return modelName;
	}

	public void setModelName(String modelName) {
		this.modelName = modelName;
	}

	public Long getModelId() {
		return modelId;
	}

	public void setModelId(Long modelId) {
		this.modelId = modelId;
	}

	public Comment getComment() {
		return comment;
	}

	public void setComment(Comment comment) {
		this.comment = comment;
	}
	

}
