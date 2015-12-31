package com.codingera.module.fileUpload.service.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.codingera.common.framework.jpa.JpaQueryUtils;
import com.codingera.module.fileUpload.model.Attachment;
import com.codingera.module.fileUpload.repository.AttachmentRepository;
import com.codingera.module.fileUpload.service.AttachmentService;

public class AttachmentServiceImpl implements AttachmentService{

	@Value("${staticResourceHostRoot}")
	private String staticResourceHostRoot;     
	@Autowired 
	private AttachmentRepository attachmentRepository;
	
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
		return null;
		//return JpaQueryUtils.query(em.createQuery("select count(*) from AttachmentPO"), em.createQuery("from AttachmentPO"), pr);
	}

	@Override
	public Attachment getByPath(String path) {
		// TODO Auto-generated method stub
		return null;
	}

	
}
