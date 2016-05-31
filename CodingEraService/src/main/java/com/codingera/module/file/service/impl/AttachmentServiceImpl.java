package com.codingera.module.file.service.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.codingera.module.base.jpa.JpaQueryUtils;
import com.codingera.module.file.model.Attachment;
import com.codingera.module.file.repository.AttachmentRepository;
import com.codingera.module.file.service.AttachmentService;

@Service("AttachmentService")
public class AttachmentServiceImpl implements AttachmentService {

	@Autowired
	private AttachmentRepository attachmentRepository;

	@PersistenceContext
	private EntityManager em;

	@Override
	public Attachment save(Attachment attachment) {
		return attachmentRepository.save(attachment);
	}

	@Override
	public Attachment getById(Long id) {
		return attachmentRepository.findOne(id);
	}

	@Override
	public Attachment deleteById(Long id) {
		Attachment attachment = attachmentRepository.findOne(id);
		attachmentRepository.delete(attachment);
		return attachment;
	}

	@SuppressWarnings("unchecked")
	@Override
	public Page<Attachment> findAttachments(PageRequest pr) {
		return JpaQueryUtils.query(em.createQuery("select count(*) from AttachmentPO"), em.createQuery("from AttachmentPO"), pr);
	}

	@Override
	public Attachment getByPath(String path) {
		// TODO Auto-generated method stub
		return null;
	}

}
