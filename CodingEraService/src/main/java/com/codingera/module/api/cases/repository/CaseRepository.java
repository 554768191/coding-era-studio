package com.codingera.module.api.cases.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.codingera.module.api.cases.model.Case;
import com.codingera.module.api.cases.repository.custom.CaseRepositoryCustom;

public interface CaseRepository extends PagingAndSortingRepository<Case, Long>,CaseRepositoryCustom {

}
