package com.codingera.module.api.comment.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.api.comment.criteria.CommentQueryCriteria;
import com.codingera.module.api.comment.model.Comment;
import com.codingera.module.api.comment.view.CommentView;

public interface CommentService {

	public Comment save(Comment comment);

	public Comment getById(Long id);

	public void delById(Long id);

	public Page<Comment> findCommentsByCriteria(Pageable pr, CommentQueryCriteria criteria);

	public List<Comment> findCommentsByCriteria(CommentQueryCriteria criteria);

	public void deleleComment(Comment comment);
	
	public CommentView getCommentViewById(Long id);
	
	public CommentView getCommentViewByCriteria(CommentQueryCriteria criteria);
	
	/**
	 * 查找【根评论】不带回复
	 * 
	 * @param criteria
	 * @return
	 */
	public List<Comment> findRootCommentsByCriteria(CommentQueryCriteria criteria);
	/**
	 * 查找【根评论】&【回复】
	 * 
	 * @param criteria
	 * @return
	 */
	public List<CommentView> findCommentViewsByCriteria(CommentQueryCriteria criteria);
	
}
