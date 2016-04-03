package com.codingera.module.api.dynamic.repository.custom;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.api.dynamic.criteria.DynamicQueryCriteria;
import com.codingera.module.api.dynamic.model.Dynamic;

public interface DynamicRepositoryCustom {

	public Page<Dynamic> findDynamicByCriteria(Pageable pg, DynamicQueryCriteria criteria);
}
