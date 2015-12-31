package com.codingera.module.fileUpload.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.codingera.module.fileUpload.model.Attachment;

public interface AttachmentService {

	
	public Attachment save(Attachment attachment);
	
	public Attachment getById(Long id);
	
	public Attachment deleteById(Long id);
	
	public Page<Attachment> findAttachments(PageRequest pr);

	public Attachment getByPath(String path);
}
