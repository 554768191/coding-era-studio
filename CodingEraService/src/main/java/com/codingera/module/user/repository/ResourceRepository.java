package com.codingera.module.user.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.codingera.module.user.model.Resource;
import com.codingera.module.user.repository.custom.ResourceRepositoryCustom;

public interface ResourceRepository extends PagingAndSortingRepository<Resource, String>, JpaSpecificationExecutor<Resource>, ResourceRepositoryCustom {

	Resource getByResource(String resource);
	
}
