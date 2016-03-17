package com.codingera.module.api.tag.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.api.tag.criteria.TagQueryCriteria;
import com.codingera.module.api.tag.model.Tag;

public interface TagService {

	public Tag save(Tag tag);

	public Tag getById(Long id);

	public void delById(Long id);

	public Page<Tag> findTagByCriteria(Pageable pr, TagQueryCriteria criteria);

	public List<Tag> findTagByCriteria(TagQueryCriteria criteria);
}
