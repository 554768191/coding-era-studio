package com.codingera.module.fileUpload.service;

import java.awt.Dimension;
import java.io.File;
import java.io.InputStream;

import com.codingera.module.fileUpload.model.Attachment;

public interface AttachmentManager {
	
	public Attachment addImage(String name,File file,ImageTransform orginTransform,ImageTransform standardTransorm,ImageTransform thumbnailTransform);

	public Attachment addImage(String name,File file,Dimension standardSize,Dimension thumbnailSize);
	
	
	
	public Attachment addImage(String directory, String name, File file, Dimension standardSize, Dimension thumbnailSize);
	
	public Attachment addImage(String directory, String name,byte[] data,Dimension standardSize,Dimension thumbnailSize);
	
	public Attachment addImage(String directory, String name, File file, ImageTransform orginTransform, ImageTransform standardTransorm, ImageTransform thumbnailTransform);
	
	public Attachment addImage(String directory, String name, byte[] data, ImageTransform orginTransform, ImageTransform standardTransorm, ImageTransform thumbnailTransform);
	
	public Attachment addAttachment(String name,File file);
	
	public Attachment addAttachment(String name,InputStream in);
	
	public Attachment addAttachment(String name,byte[] data);
	
	public Attachment addAttachment(String name,String content);
	
	public Attachment addAttachmentByPath(String path,File file);
	
	public Attachment addAttachmentByPath(String path,InputStream in);
	
	public Attachment addAttachmentByPath(String path,byte[] data);
	
	public Attachment addAttachmentByPath(String path,String content);
	
	public Attachment getAttachment(String path);
	
	public InputStream getAttachmentAsStream(String path);
	
	public byte[] getAttachmentAsBytes(String path);
	
	public File getAttachmentAsFile(String path);
	
	public void removeAttachment(String path);
	
	public void removeAttachment(Attachment attachment);
}
