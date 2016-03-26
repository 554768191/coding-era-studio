package com.codingera.module.api.comment.criteria;

import com.codingera.module.jpa.QueryCriteria;

public class CommentQueryCriteria extends QueryCriteria {

	/**
	 * 
	 */
	private static final long serialVersionUID = -45075187949824003L;

	private String keyWord;

	private String type; //same as modelName
	private Long modelId;
	private Long commentId;
	private Long parentId;

	public String getKeyWord() {
		return keyWord;
	}

	public void setKeyWord(String keyWord) {
		this.keyWord = keyWord;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Long getModelId() {
		return modelId;
	}

	public void setModelId(Long modelId) {
		this.modelId = modelId;
	}

	public Long getCommentId() {
		return commentId;
	}

	public void setCommentId(Long commentId) {
		this.commentId = commentId;
	}

	public Long getParentId() {
		return parentId;
	}

	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
	

}
