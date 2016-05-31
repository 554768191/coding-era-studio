package com.codingera.module.user.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.codingera.module.user.model.Resource;

public interface ResourceRepository extends PagingAndSortingRepository<Resource, Long>, JpaSpecificationExecutor<Resource> {

	Resource getByResource(String resource);
	
}
