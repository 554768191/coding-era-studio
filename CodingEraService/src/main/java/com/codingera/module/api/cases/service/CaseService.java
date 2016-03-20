package com.codingera.module.api.cases.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.api.cases.criteria.CaseQueryCriteria;
import com.codingera.module.api.cases.model.Case;

public interface CaseService {
	
	Case getById(Long id);

	void deleteById(Long id);
	
	Case save(Case ceCase) ;
	
	Page<Case> findCaseByCriteria(Pageable pr, CaseQueryCriteria criteria);
}
