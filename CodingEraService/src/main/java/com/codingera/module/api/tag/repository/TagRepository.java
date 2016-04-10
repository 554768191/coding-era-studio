package com.codingera.module.api.tag.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.codingera.module.api.tag.model.Tag;
import com.codingera.module.api.tag.repository.custom.TagRepositoryCustom;

public interface TagRepository extends PagingAndSortingRepository<Tag, Long>, JpaSpecificationExecutor<Tag>, TagRepositoryCustom {

	public Tag getTagByName(String name); 
}
