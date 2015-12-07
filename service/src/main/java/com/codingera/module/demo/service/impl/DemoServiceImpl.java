package com.codingera.module.demo.service.impl;


import com.codingera.module.demo.criteria.DemoQueryCriteria;
import com.codingera.module.demo.model.Demo;
import com.codingera.module.demo.repository.DemoRepository;
import com.codingera.module.demo.service.DemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service("DemoService")
public class DemoServiceImpl implements DemoService {

	@Autowired
	DemoRepository demoRepository;
	
	@Override
	public Demo create(Demo demo) {
		

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
