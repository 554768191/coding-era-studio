package com.codingera.module.user.repository.custom;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.user.criteria.RoleQueryCriteria;
import com.codingera.module.user.criteria.UserQueryCriteria;
import com.codingera.module.user.model.Role;
import com.codingera.module.user.model.User;

public interface RoleRepositoryCustom {

	public Page<Role> findByCriteria(Pageable pg, RoleQueryCriteria criteria);
}
