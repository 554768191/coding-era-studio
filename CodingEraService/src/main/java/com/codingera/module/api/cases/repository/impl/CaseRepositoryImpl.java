package com.codingera.module.api.cases.repository.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.api.cases.criteria.CaseQueryCriteria;
import com.codingera.module.api.cases.model.Case;
import com.codingera.module.api.cases.repository.custom.CaseRepositoryCustom;
import com.codingera.module.jpa.CriterionUtils;
import com.codingera.module.jpa.JpaCriteria;
import com.codingera.module.jpa.JpaQueryUtils;
import com.codingera.module.jpa.OrCriterion;

public class CaseRepositoryImpl implements CaseRepositoryCustom {

	@PersistenceContext
	private EntityManager em;

	@SuppressWarnings("unchecked")
	@Override
	public Page<Case> findCaseByCriteria(Pageable pg, CaseQueryCriteria criteria) {
		JpaCriteria s = new JpaCriteria("Case c");
		s.add(new OrCriterion(CriterionUtils.contains("c.title", criteria.getKeyWord(), true)));
		s.add(CriterionUtils.equals("c.status", criteria.getStatus(), false));
		s.setSortBy("c.createdTime desc");
		return JpaQueryUtils.query(em, s, pg);
	}

}
