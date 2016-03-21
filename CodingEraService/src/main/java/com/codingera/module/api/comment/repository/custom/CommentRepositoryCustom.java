package com.codingera.module.api.comment.repository.custom;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.api.comment.criteria.CommentQueryCriteria;
import com.codingera.module.api.comment.model.Comment;

public interface CommentRepositoryCustom {

	public Page<Comment> findCommentsByCriteria(Pageable pg, CommentQueryCriteria criteria);

	public List<Comment> findCommentsByCriteria(CommentQueryCriteria criteria);

}
