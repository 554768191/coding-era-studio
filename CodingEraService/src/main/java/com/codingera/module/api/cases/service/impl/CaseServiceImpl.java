package com.codingera.module.api.cases.service.impl;


import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.codingera.module.api.cases.criteria.CaseQueryCriteria;
import com.codingera.module.api.cases.model.Case;
import com.codingera.module.api.cases.repository.CaseRepository;
import com.codingera.module.api.cases.service.CaseService;

@Service("CaseService")
public class CaseServiceImpl implements CaseService {

	
	@Autowired CaseRepository caseRepository;
	
	@Override
	public Case save(Case ceCase) {
		ceCase.setCreateTime(new Date());
		return caseRepository.save(ceCase);
	}

	@Override
	public Page<Case> findCaseByCriteria(Pageable pr, CaseQueryCriteria criteria) {
		return caseRepository.findCaseByCriteria(pr, criteria);
	}

	@Override
	public void deleteById(Long id) {
		Case ceCase = caseRepository.findOne(id);
		ceCase.setDeleted(true);
		caseRepository.save(ceCase);
	}




}
