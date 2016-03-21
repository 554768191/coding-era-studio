package com.codingera.module.api.tag.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.codingera.module.api.tag.criteria.TagQueryCriteria;
import com.codingera.module.api.tag.model.Tag;
import com.codingera.module.api.tag.repository.TagRepository;
import com.codingera.module.api.tag.service.TagService;

@Service("TagService")
public class TagServiceImpl implements TagService {

	@Autowired
	TagRepository tagRepository;

	@Override
	public Tag save(Tag tag) {

		return tagRepository.save(tag);
	}

	@Override
	public Tag getById(Long id) {
		return tagRepository.findOne(id);
	}

	@Override
	public void delById(Long id) {
		tagRepository.delete(id);
	}

	@Override
	public Page<Tag> findTagsByCriteria(Pageable pr, TagQueryCriteria criteria) {
		return tagRepository.findTagsByCriteria(pr, criteria);
	}

	@Override
	public List<Tag> findTagsByCriteria(TagQueryCriteria criteria) {
		return tagRepository.findTagsByCriteria(criteria);
	}

	@Override
	public void deleleTag(Tag tag) {
		tagRepository.delete(tag);
	}

}
