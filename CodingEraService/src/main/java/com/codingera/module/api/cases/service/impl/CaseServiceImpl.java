package com.codingera.module.api.cases.service.impl;


import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.codingera.module.api.cases.criteria.CaseQueryCriteria;
import com.codingera.module.api.cases.model.Case;
import com.codingera.module.api.cases.model.Case.Status;
import com.codingera.module.api.cases.repository.CaseRepository;
import com.codingera.module.api.cases.service.CaseService;

@Service("CaseService")
public class CaseServiceImpl implements CaseService {

	
	@Autowired CaseRepository caseRepository;
	
	@Override
	public Case save(Case ceCase) {
		if(ceCase.getCreateTime() == null){
			ceCase.setCreateTime(new Date());
		}
		if(ceCase.getStatus() == null){
			//如果为空,默认草稿
			ceCase.setStatus(Case.Status.SKETCH);
		}
		return caseRepository.save(ceCase);
	}

	@Override
	public Page<Case> findCaseByCriteria(Pageable pr, CaseQueryCriteria criteria) {
		return caseRepository.findCaseByCriteria(pr, criteria);
	}

	@Override
	public void deleteById(Long id) {
		Case ceCase = caseRepository.findOne(id);
		ceCase.setStatus(Status.DELETED);
		caseRepository.save(ceCase);
	}

	@Override
	public Case getById(Long id) {
		return caseRepository.findOne(id);
	}




}
