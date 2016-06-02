package com.codingera.module.user.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.codingera.module.user.criteria.ResourceQueryCriteria;
import com.codingera.module.user.model.Resource;
import com.codingera.module.user.repository.ResourceRepository;
import com.codingera.module.user.service.ResourceService;

@Service("ResourceService")
public class ResourceServiceImpl implements ResourceService {

	@Autowired
	ResourceRepository resourceRepository;
	
	
	@Override
	public Resource getById(String id) {
		return resourceRepository.findOne(id);
	}
	@Override
	public void delById(String id) {
		resourceRepository.delete(id);
		
	}
	@Override
	public Page<Resource> findResourcesByCriteria(Pageable pg, ResourceQueryCriteria criteria) {
		return resourceRepository.findByCriteria(pg, criteria);
	}
	@Override
	public Resource save(Resource resource) {
		return resourceRepository.save(resource);
	}
	
	@Override
	public List<Resource> findResources() {
		return (List<Resource>) resourceRepository.findAll();
	}


}
