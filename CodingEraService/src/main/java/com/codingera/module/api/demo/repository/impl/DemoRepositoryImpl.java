package com.codingera.module.api.demo.repository.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.api.demo.criteria.DemoQueryCriteria;
import com.codingera.module.api.demo.model.Demo;
import com.codingera.module.api.demo.repository.custom.DemoRepositoryCustom;
import com.codingera.module.jpa.CriterionUtils;
import com.codingera.module.jpa.JpaCriteria;
import com.codingera.module.jpa.JpaQueryUtils;
import com.codingera.module.jpa.OrCriterion;

public class DemoRepositoryImpl implements DemoRepositoryCustom {

	@PersistenceContext
	private EntityManager em;

	@SuppressWarnings("unchecked")
	@Override
	public Page<Demo> findDemoByCriteria(Pageable pg, DemoQueryCriteria criteria) {
		JpaCriteria s = new JpaCriteria("Demo d");
		s.add(new OrCriterion(
				CriterionUtils.contains("d.name", criteria.getKeyWord(), true), 
				CriterionUtils.contains("d.remark", criteria.getKeyWord(), true)));
		s.setSortBy("d.id desc");
		return JpaQueryUtils.query(em, s, pg);
	}

}
