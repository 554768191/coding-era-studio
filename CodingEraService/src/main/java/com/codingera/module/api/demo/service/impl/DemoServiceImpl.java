package com.codingera.module.api.demo.service.impl;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.codingera.module.api.demo.criteria.DemoQueryCriteria;
import com.codingera.module.api.demo.model.Demo;
import com.codingera.module.api.demo.repository.DemoRepository;
import com.codingera.module.api.demo.service.DemoService;

@Service("DemoService")
public class DemoServiceImpl implements DemoService {

	@Autowired
	DemoRepository demoRepository;
	
	@Override
	public Demo save(Demo demo) {
		

		return demoRepository.save(demo);
	}



	@Override
	public Demo getById(Long id) {
		return demoRepository.findOne(id);
	}

	@Override
	public void delById(Long id) {
		demoRepository.delete(id);
	}

	@Override
	public Page<Demo> findDemoByCriteria(Pageable pr, DemoQueryCriteria criteria) {
		return demoRepository.findDemoByCriteria(pr, criteria);
	}


}
