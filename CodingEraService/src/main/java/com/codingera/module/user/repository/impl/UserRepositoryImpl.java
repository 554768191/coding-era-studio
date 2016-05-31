package com.codingera.module.user.repository.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.base.jpa.CriterionUtils;
import com.codingera.module.base.jpa.JpaCriteria;
import com.codingera.module.base.jpa.JpaQueryUtils;
import com.codingera.module.base.jpa.OrCriterion;
import com.codingera.module.user.criteria.UserQueryCriteria;
import com.codingera.module.user.model.User;
import com.codingera.module.user.repository.custom.UserRepositoryCustom;

public class UserRepositoryImpl implements UserRepositoryCustom {

	@PersistenceContext
	private EntityManager em;

	@SuppressWarnings("unchecked")
	@Override
	public Page<User> findUserByCriteria(Pageable pg, UserQueryCriteria criteria) {
		JpaCriteria s = new JpaCriteria("User u");
		//s.add(CriterionUtils.contains("d.name", criteria.getKeyWord(), true));
		s.add(new OrCriterion(CriterionUtils.contains("u.username", criteria.getKeyWord(), true)));
		return JpaQueryUtils.query(em, s, pg);
	}

}
