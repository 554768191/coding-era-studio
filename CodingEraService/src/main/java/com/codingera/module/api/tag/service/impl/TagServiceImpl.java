package com.codingera.module.api.tag.service.impl;

import java.util.List;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import com.codingera.module.api.cases.model.Case;
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
		Tag storeTag = tagRepository.getTagByName(tag.getName());
		Assert.isNull(storeTag, "标签名【"+tag.getName()+"】已存在");
		return tagRepository.save(tag);
	}

	@Override
	public Tag getById(Long id) {
		return tagRepository.findOne(id);
	}

	@Override
	public void delById(Long id) {
		Tag tag =  this.getById(id);
		Hibernate.initialize(tag.getCases());
		Assert.isTrue(tag.getCases().isEmpty(), "标签【"+tag.getName()+"】已经被使用");
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
		tag =  this.getById(tag.getId());
		Hibernate.initialize(tag.getCases());
		Assert.isTrue(tag.getCases().isEmpty(), "标签【"+tag.getName()+"】已经被使用");
		tagRepository.delete(tag);
	}

}
