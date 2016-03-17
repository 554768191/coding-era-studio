package com.codingera.module.api.tag.repository.custom;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.api.tag.criteria.TagQueryCriteria;
import com.codingera.module.api.tag.model.Tag;

public interface TagRepositoryCustom {

	public Page<Tag> findTagByCriteria(Pageable pg, TagQueryCriteria criteria);

	public List<Tag> findTagByCriteria(TagQueryCriteria criteria);
	
}
