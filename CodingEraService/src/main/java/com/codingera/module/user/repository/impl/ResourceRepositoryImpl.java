package com.codingera.module.user.repository.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.base.jpa.CriterionUtils;
import com.codingera.module.base.jpa.JpaCriteria;
import com.codingera.module.base.jpa.JpaQueryUtils;
import com.codingera.module.base.jpa.OrCriterion;
import com.codingera.module.user.criteria.ResourceQueryCriteria;
import com.codingera.module.user.model.Resource;
import com.codingera.module.user.repository.custom.ResourceRepositoryCustom;

public class ResourceRepositoryImpl implements ResourceRepositoryCustom {

	@PersistenceContext
	private EntityManager em;

	@SuppressWarnings("unchecked")
	@Override
	public Page<Resource> findByCriteria(Pageable pg, ResourceQueryCriteria criteria) {
		JpaCriteria s = new JpaCriteria("Resource a");
		s.add(new OrCriterion(
				CriterionUtils.contains("a.description", criteria.getKeyWord(), true),
				CriterionUtils.contains("a.resource", criteria.getKeyWord(), true)));
		return JpaQueryUtils.query(em, s, pg);
	}

}
