package com.codingera.module.api.demo.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.codingera.module.api.demo.model.Demo;
import com.codingera.module.api.demo.repository.custom.DemoRepositoryCustom;

public interface DemoRepository 
extends 
PagingAndSortingRepository<Demo, Long>, 
JpaSpecificationExecutor<Demo>,
DemoRepositoryCustom {


	
}
