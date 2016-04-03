package com.codingera.module.api.dynamic.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.codingera.module.api.dynamic.model.Dynamic;
import com.codingera.module.api.dynamic.repository.custom.DynamicRepositoryCustom;

public interface DynamicRepository extends PagingAndSortingRepository<Dynamic, Long>,DynamicRepositoryCustom {

}
