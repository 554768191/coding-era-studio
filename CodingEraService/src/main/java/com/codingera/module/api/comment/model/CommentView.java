package com.codingera.module.api.comment.model;

import java.util.List;

import com.codingera.module.base.model.BaseView;

public class CommentView extends BaseView {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2485208089397319961L;

	private Comment comment;
	
	private List<Comment> replies;

	public Comment getComment() {
		return comment;
	}

	public void setComment(Comment comment) {
		this.comment = comment;
	}

	public List<Comment> getReplies() {
		return replies;
	}

	public void setReplies(List<Comment> replies) {
		this.replies = replies;
	} 
	
	
}
