package com.codingera.module.demo.repository.impl;

import com.codingera.common.framework.jpa.CriterionUtils;
import com.codingera.common.framework.jpa.JpaCriteria;
import com.codingera.common.framework.jpa.JpaQueryUtils;
import com.codingera.common.framework.jpa.OrCriterion;
import com.codingera.module.demo.criteria.DemoQueryCriteria;
import com.codingera.module.demo.model.Demo;
import com.codingera.module.demo.repository.custom.DemoRepositoryCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

public class DemoRepositoryImpl implements DemoRepositoryCustom {

	@PersistenceContext private EntityManager em;
	
	@SuppressWarnings("unchecked")
	@Override
	public Page<Demo> findDemoByCriteria(Pageable pg, DemoQueryCriteria criteria) {
		JpaCriteria s = new JpaCriteria("Demo d");
		//s.add(CriterionUtils.contains("d.name", criteria.getKeyWord(), true));
		s.add(new OrCriterion(
				CriterionUtils.contains("d.name", criteria.getKeyWord(), true),
				CriterionUtils.contains("d.remark", criteria.getKeyWord(), true)
				)
		);
		return JpaQueryUtils.query(em,s, pg);
	}

}
