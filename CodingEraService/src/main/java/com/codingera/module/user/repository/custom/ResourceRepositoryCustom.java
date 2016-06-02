package com.codingera.module.user.repository.custom;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.user.criteria.ResourceQueryCriteria;
import com.codingera.module.user.model.Resource;

public interface ResourceRepositoryCustom {

	public Page<Resource> findByCriteria(Pageable pg, ResourceQueryCriteria criteria);
}
