package com.codingera.module.api.dynamic.service.impl;


import java.util.Date;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.codingera.module.api.dynamic.criteria.DynamicQueryCriteria;
import com.codingera.module.api.dynamic.model.Dynamic;
import com.codingera.module.api.dynamic.model.Dynamic.Status;
import com.codingera.module.api.dynamic.repository.DynamicRepository;
import com.codingera.module.api.dynamic.service.DynamicService;

@Service("DynamicService")
public class DynamicServiceImpl implements DynamicService {

	
	@Autowired DynamicRepository dynamicRepository;
	
	@Override
	public Dynamic save(Dynamic ceDynamic) {
		if(ceDynamic.getStatus() == null){
			//如果为空,默认发布
			ceDynamic.setStatus(Dynamic.Status.PUBLISHED);
		}
		return dynamicRepository.save(ceDynamic);
	}

	@Override
	public Page<Dynamic> findDynamicByCriteria(Pageable pr, DynamicQueryCriteria criteria) {
		Page<Dynamic> pages = dynamicRepository.findDynamicByCriteria(pr, criteria);
		for(Dynamic dynamic : pages.getContent()){
			Hibernate.initialize(dynamic.getCreatedUser());
		}
		
		return pages;
	}

	@Override
	public void deleteById(Long id) {
		Dynamic ceDynamic = dynamicRepository.findOne(id);
		ceDynamic.setStatus(Status.DELETED);
		dynamicRepository.save(ceDynamic);
	}

	@Override
	public Dynamic getById(Long id) {
		Dynamic ceDynamic = dynamicRepository.findOne(id);
		//Hibernate.initialize(ceDynamic.getCreatedUser());
		return ceDynamic;
	}




}
