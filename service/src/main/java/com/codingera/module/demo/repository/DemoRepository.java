package com.codingera.module.demo.repository;

import com.codingera.module.demo.model.Demo;
import com.codingera.module.demo.repository.custom.DemoRepositoryCustom;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface DemoRepository extends PagingAndSortingRepository<Demo, Long>, JpaSpecificationExecutor<Demo>,DemoRepositoryCustom {


	
}
