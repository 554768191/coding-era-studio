package com.codingera.module.fileUpload.service;

public interface AttachmentPathResolver {
	
	public String resolvePath(String name) ;
	
	public String getRootPath();
	
	public boolean isAttachmentPath(String path);
}
