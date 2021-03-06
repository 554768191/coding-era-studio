package com.codingera.module.api.tag.repository.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.api.tag.criteria.TagQueryCriteria;
import com.codingera.module.api.tag.model.Tag;
import com.codingera.module.api.tag.repository.custom.TagRepositoryCustom;
import com.codingera.module.base.jpa.CriterionUtils;
import com.codingera.module.base.jpa.JpaCriteria;
import com.codingera.module.base.jpa.JpaQueryUtils;
import com.codingera.module.base.jpa.OrCriterion;
import com.codingera.module.base.jpa.QueryResult;

public class TagRepositoryImpl implements TagRepositoryCustom {

	@PersistenceContext
	private EntityManager em;

	@Override
	public Page<Tag> findTagsByCriteria(Pageable pg, TagQueryCriteria criteria) {
		JpaCriteria s = new JpaCriteria("Tag d");
		s.add(new OrCriterion(
				CriterionUtils.contains("d.name", criteria.getKeyWord(), true), 
				CriterionUtils.contains("d.category", criteria.getKeyWord(), true)));
		s.setSortBy("d.id desc");
		return JpaQueryUtils.query(em, s, pg);
	}

	@Override
	public List<Tag> findTagsByCriteria(TagQueryCriteria criteria) {
		
		JpaCriteria jpaCriteria = new JpaCriteria("Tag d");
//		jpaCriteria.add(new OrCriterion(
//				CriterionUtils.contains("d.name", criteria.getKeyWord(), true), 
//				CriterionUtils.contains("d.remark", criteria.getKeyWord(), true)));
		jpaCriteria.setSortBy("d.id desc");
		QueryResult queryResult = JpaQueryUtils.query(em, jpaCriteria, criteria);
		return queryResult.getResultObject();
	}

}
