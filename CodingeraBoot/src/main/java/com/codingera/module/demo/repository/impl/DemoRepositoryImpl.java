package com.codingera.module.demo.repository.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.demo.criteria.DemoQueryCriteria;
import com.codingera.module.demo.model.Demo;
import com.codingera.module.demo.repository.custom.DemoRepositoryCustom;

public class DemoRepositoryImpl implements DemoRepositoryCustom {

	@PersistenceContext private EntityManager em;
	
	@SuppressWarnings("unchecked")
	@Override
	public Page<Demo> findDemoByCriteria(Pageable pg, DemoQueryCriteria criteria) {
//		JpaCriteria s = new JpaCriteria("Demo d");
//		s.add(new OrCriterion(
//				CriterionUtils.contains("d.name", criteria.getKeyWord(), true),
//				CriterionUtils.contains("d.remark", criteria.getKeyWord(), true)
//				)
//		);
//		s.setSortBy("d.id desc");
//		return JpaQueryUtils.query(em,s, pg);
		return null;
	}

}
