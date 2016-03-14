package com.codingera.module.demo.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.codingera.module.demo.model.Demo;
import com.codingera.module.demo.repository.custom.DemoRepositoryCustom;

public interface DemoRepository 
extends 
PagingAndSortingRepository<Demo, Long>, 
JpaSpecificationExecutor<Demo>,
DemoRepositoryCustom {


	
}
