package com.codingera.module.file.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.codingera.module.file.model.Attachment;

/**
 * 
 * 附件表操作接口
 * 
 * @author JasonWoo
 *
 */
public interface AttachmentService {

	public Attachment save(Attachment attachment);

	public Attachment getById(Long id);

	public Attachment deleteById(Long id);

	public Page<Attachment> findAttachments(PageRequest pr);

	public Attachment getByPath(String path);
}
