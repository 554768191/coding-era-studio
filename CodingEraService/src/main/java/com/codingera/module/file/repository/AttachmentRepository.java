package com.codingera.module.file.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.codingera.module.file.model.Attachment;
import com.codingera.module.file.repository.custom.AttachmentRepositoryCustom;

public interface AttachmentRepository extends PagingAndSortingRepository<Attachment, Long>, JpaSpecificationExecutor<Attachment>, AttachmentRepositoryCustom {

}
