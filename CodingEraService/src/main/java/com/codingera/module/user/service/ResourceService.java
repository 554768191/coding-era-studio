package com.codingera.module.user.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.user.criteria.ResourceQueryCriteria;
import com.codingera.module.user.model.Resource;

public interface ResourceService{

	public Resource save(Resource resource);

	public Resource getById(String id);

	public void delById(String id);

	public List<Resource> findResources();
	
	public Page<Resource> findResourcesByCriteria(Pageable pg, ResourceQueryCriteria criteria);
	

}
