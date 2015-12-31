package com.codingera.module.fileUpload.repository;

import com.codingera.module.fileUpload.repository.custom.AttachmentRepositoryCustom;
import com.codingera.module.fileUpload.model.Attachment;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface AttachmentRepository extends PagingAndSortingRepository<Attachment, Long>, JpaSpecificationExecutor<Attachment>,AttachmentRepositoryCustom {


	
}
