package com.codingera.module.demo.repository.custom;


import com.codingera.module.demo.criteria.DemoQueryCriteria;
import com.codingera.module.demo.model.Demo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface DemoRepositoryCustom {

	public Page<Demo> findDemoByCriteria(Pageable pg, DemoQueryCriteria criteria);
}
