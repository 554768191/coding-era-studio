package com.codingera.module.api.dynamic.repository.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.api.dynamic.criteria.DynamicQueryCriteria;
import com.codingera.module.api.dynamic.model.Dynamic;
import com.codingera.module.api.dynamic.repository.custom.DynamicRepositoryCustom;
import com.codingera.module.jpa.CriterionUtils;
import com.codingera.module.jpa.JpaCriteria;
import com.codingera.module.jpa.JpaQueryUtils;
import com.codingera.module.jpa.OrCriterion;

public class DynamicRepositoryImpl implements DynamicRepositoryCustom {

	@PersistenceContext
	private EntityManager em;

	@SuppressWarnings("unchecked")
	@Override
	public Page<Dynamic> findDynamicByCriteria(Pageable pg, DynamicQueryCriteria criteria) {
		JpaCriteria s = new JpaCriteria("Dynamic d");
		s.add(new OrCriterion(CriterionUtils.contains("d.content", criteria.getKeyWord(), true)));
		s.add(CriterionUtils.equals("d.status", criteria.getStatus(), false));
		s.setSortBy("d.createdTime desc");
		return JpaQueryUtils.query(em, s, pg);
	}

}
