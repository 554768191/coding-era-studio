package com.codingera.module.api.comment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.codingera.module.api.comment.model.Comment;
import com.codingera.module.api.comment.repository.custom.CommentRepositoryCustom;

public interface CommentRepository extends PagingAndSortingRepository<Comment, Long>, JpaSpecificationExecutor<Comment>, CommentRepositoryCustom {
	
	public List<Comment> findCommentByParentId(Long parentId);
	
	public List<Comment> findCommentByParentIdIn(List<Long> parentIds);
	
}
