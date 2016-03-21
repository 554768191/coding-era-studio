package com.codingera.module.api.comment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.codingera.module.api.comment.model.CommentRoot;

public interface CommentRootRepository extends PagingAndSortingRepository<CommentRoot, Long>, JpaSpecificationExecutor<CommentRoot> {
	
	//public CommentRoot getCommentRootByCommentIdAndModelIdAndModelName(Long commentId, Long modelId, String modelName);
	
	//public CommentRoot getCommentRootByCommentId(Long commentId);
	
	public List<CommentRoot> findCommentRootByModelIdAndModelName(Long modelId, String modelName);
	
}
