package com.codingera.module.api.comment.repository.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.api.comment.criteria.CommentQueryCriteria;
import com.codingera.module.api.comment.model.Comment;
import com.codingera.module.api.comment.repository.custom.CommentRepositoryCustom;
import com.codingera.module.jpa.CriterionUtils;
import com.codingera.module.jpa.JpaCriteria;
import com.codingera.module.jpa.JpaQueryUtils;
import com.codingera.module.jpa.OrCriterion;
import com.codingera.module.jpa.QueryResult;

public class CommentRepositoryImpl implements CommentRepositoryCustom {

	@PersistenceContext
	private EntityManager em;

	@SuppressWarnings("unchecked")
	@Override
	public Page<Comment> findCommentsByCriteria(Pageable pg, CommentQueryCriteria criteria) {
		JpaCriteria jpaCriteria = new JpaCriteria("Comment c");
		jpaCriteria.add(new OrCriterion(
				CriterionUtils.contains("c.title", criteria.getKeyWord(), true), 
				CriterionUtils.contains("c.content", criteria.getKeyWord(), true)));
		jpaCriteria.add(new OrCriterion(
				CriterionUtils.equals("c.parentId", criteria.getParentId(), true)));
		jpaCriteria.setSortBy("c.id desc");
		return JpaQueryUtils.query(em, jpaCriteria, pg);
	}

	@Override
	public List<Comment> findCommentsByCriteria(CommentQueryCriteria criteria) {
		
		JpaCriteria jpaCriteria = new JpaCriteria("Comment d");
//		jpaCriteria.add(new OrCriterion(
//				CriterionUtils.contains("d.name", criteria.getKeyWord(), true), 
//				CriterionUtils.contains("d.remark", criteria.getKeyWord(), true)));
		jpaCriteria.setSortBy("d.id desc");
		QueryResult queryResult = JpaQueryUtils.query(em, jpaCriteria, criteria);
		return queryResult.getResultObject();
	}

}
