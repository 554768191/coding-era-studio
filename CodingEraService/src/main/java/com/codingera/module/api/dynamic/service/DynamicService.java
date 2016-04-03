package com.codingera.module.api.dynamic.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.api.dynamic.criteria.DynamicQueryCriteria;
import com.codingera.module.api.dynamic.model.Dynamic;

public interface DynamicService {
	
	Dynamic getById(Long id);

	void deleteById(Long id);
	
	Dynamic save(Dynamic dynamic) ;
	
	Page<Dynamic> findDynamicByCriteria(Pageable pr, DynamicQueryCriteria criteria);
}
