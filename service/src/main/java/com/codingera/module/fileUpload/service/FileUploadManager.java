package com.codingera.module.fileUpload.service;

import java.io.File;
import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.codingera.module.fileUpload.model.Attachment;

public class FileUploadManager {
	
	private AttachmentManager attachmentManager;
	
	public Attachment uploadFile( MultipartFile file) {
		try{
			return attachmentManager.addAttachment(file.getOriginalFilename(), file.getBytes());
		}catch(IOException e) {
			throw new RuntimeException(e);
		}
	}
	
	public File getFile(Attachment file) {
		return attachmentManager.getAttachmentAsFile(file.getPath());
	}
	
	public File getFile(String path) {
		return attachmentManager.getAttachmentAsFile(path);
	}
	
	public void removeFile(Attachment file) {
		attachmentManager.removeAttachment(file.getPath());
	}
	
	public void removeFile(String filePath) {
		attachmentManager.removeAttachment(filePath);
	}

	public AttachmentManager getAttachmentManager() {
		return attachmentManager;
	}

	public void setAttachmentManager(AttachmentManager attachmentManager) {
		this.attachmentManager = attachmentManager;
	}
	
	

	
}
