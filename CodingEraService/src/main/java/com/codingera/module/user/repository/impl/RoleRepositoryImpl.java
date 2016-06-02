package com.codingera.module.user.repository.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.base.jpa.CriterionUtils;
import com.codingera.module.base.jpa.JpaCriteria;
import com.codingera.module.base.jpa.JpaQueryUtils;
import com.codingera.module.base.jpa.OrCriterion;
import com.codingera.module.user.criteria.RoleQueryCriteria;
import com.codingera.module.user.model.Role;
import com.codingera.module.user.repository.custom.RoleRepositoryCustom;

public class RoleRepositoryImpl implements RoleRepositoryCustom {

	@PersistenceContext
	private EntityManager em;

	@SuppressWarnings("unchecked")
	@Override
	public Page<Role> findByCriteria(Pageable pg, RoleQueryCriteria criteria) {
		JpaCriteria s = new JpaCriteria("Role a");
		s.add(new OrCriterion(CriterionUtils.contains("a.role", criteria.getKeyWord(), true),
				CriterionUtils.contains("a.description", criteria.getKeyWord(), true)));
		return JpaQueryUtils.query(em, s, pg);
	}

}
