package com.codingera.module.api.demo.service;


import com.codingera.module.api.demo.criteria.DemoQueryCriteria;
import com.codingera.module.api.demo.model.Demo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DemoService  {

	
	Demo save(Demo demo);
	Demo getById(Long id);
	void delById(Long id);
	Page<Demo> findDemoByCriteria(Pageable pr, DemoQueryCriteria criteria);
}
